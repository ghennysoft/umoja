import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { collectMobileMoney, normalizeStatus } from "@/app/lib/maishapay";

/**
 * POST /api/contributions/initiate
 * Body :
 * {
 *   memberId: string,
 *   year: number,
 *   weekNumber: number,
 *   amount: number,          // montant en unité (ex: 1000 CDF)
 *   currency: "CDF"|"USD"|...,
 *   provider: "AIRTEL"|"ORANGE"|"MTN"|...,
 *   walletID: "+243..."
 * }
 */
const BodySchema = z.object({
  userId: z.string().min(1),
  memberId: z.string().min(1),
  amount: z.number().positive(),
  currency: z.enum(["CDF", "USD", "XAF", "XOF", "EUR"]).default("CDF"),
  provider: z.enum(["AIRTEL", "ORANGE", "MTN", "MPESA", "AFRIMONEY"]),
  walletID: z.string().regex(/^\+\d{8,15}$/, "Format international requis (+243...)"),
});

export async function POST(req: NextRequest) {
  // 1) Validation du body
  let body: z.infer<typeof BodySchema>;
  try {
    body = BodySchema.parse(await req.json());
    console.log({body});
  } catch (e: any) {
    console.log({e});
    return NextResponse.json(
      { error: "Payload invalide", details: e?.issues ?? String(e) },
      { status: 400 }
    );
  }

  // 2) Vérifier le membre
  const member = await prisma.member.findUnique({ where: { id: body.memberId } });
  if (!member) {
    return NextResponse.json({ error: "Membre introuvable" }, { status: 404 });
  }
  console.log({member})

  // 3) Générer une référence unique
  //    Format lisible : COTIS-<suffixe membre>-<année>W<semaine>-<uuid court>
  const transactionReference =
  `COTIS-${member.id.slice(-6)}-${randomUUID().split("-")[0]}`;

  // 5) Créer (ou réutiliser) la ligne Contribution en PENDING
  const contribution = await prisma.contribution.create({
    data: {
      amount: body.amount,
      currency: body.currency,
      status: "PENDING",
      transactionReference,
      user: {
        connect: {
          id: body.userId,
        },
      },
      member: {
        connect: {
          id: body.memberId,
        },
      },
    },
  });
  console.log(contribution)

  // 6) Appel MaishaPay
  const callbackUrl = `${process.env.APP_BASE_URL}/api/maishapay/callback`;

  let result;
  try {
    result = await collectMobileMoney({
      transactionReference,
      amount: String(body.amount), // la doc attend un string
      currency: body.currency,
      customerFullName: `${member.firstName} ${member.lastName}`,
      customerEmailAdress: member.email || '',
      provider: body.provider,
      walletID: body.walletID,
      callbackUrl,
    });
  } catch (err) {
    console.error("[MaishaPay] Erreur réseau :", err);
    await prisma.transaction.create({
      data: {
        contributionId: contribution.id,
        transactionReference,
        status: "FAILED",
        amount: body.amount,
        currency: body.currency,
        channel: "MOBILEMONEY",
        provider: body.provider,
        walletID: body.walletID,
        rawInitResponse: JSON.stringify({ error: String(err) }),
      },
    });
    return NextResponse.json(
      { error: "Impossible de joindre MaishaPay, réessayez." },
      { status: 502 }
    );
  }

  const { httpStatus, data } = result;

  // 7) Cas où MaishaPay refuse immédiatement (4xx)
  if (httpStatus >= 400 || !data) {
    await prisma.transaction.create({
      data: {
        contributionId: contribution.id,
        transactionReference,
        status: "FAILED",
        statusCode: httpStatus,
        amount: body.amount,
        currency: body.currency,
        channel: "MOBILEMONEY",
        provider: body.provider,
        walletID: body.walletID,
        rawInitResponse: JSON.stringify(data ?? {}),
      },
    });
    return NextResponse.json(
      { error: "Requête refusée par MaishaPay", maishapay: data },
      { status: 400 }
    );
  }

  // 8) Succès : 202 + PENDING
  const status = normalizeStatus(data.transactionStatus) ?? "PENDING";

  await prisma.transaction.create({
    data: {
      contributionId: contribution.id,
      transactionReference,
      maishaTransactionId: data.transactionId ?? null,
      originatingTransactionId: data.originatingTransactionId ?? null,
      status,
      statusCode: data.status_code ?? httpStatus,
      amount: data.order?.cost?.amount ?? body.amount,
      fees: data.order?.cost?.frais ?? null,
      total: data.order?.cost?.total ?? null,
      currency: data.order?.cost?.currency ?? body.currency,
      channel: data.paymentChannel?.channel ?? "MOBILEMONEY",
      provider: data.paymentChannel?.provider?.libelle ?? body.provider,
      walletID: data.paymentChannel?.walletID ?? body.walletID,
      rawInitResponse: JSON.stringify(data),
    },
  });

  // 9) Réponse au front : le client doit saisir son PIN, on est en attente
  return NextResponse.json(
    {
      message:
        "Transaction initiée. Validez le paiement avec votre code PIN sur votre téléphone.",
      transactionReference,
      transactionId: data.transactionId,
      status, // "PENDING"
    },
    { status: 202 }
  );
}
