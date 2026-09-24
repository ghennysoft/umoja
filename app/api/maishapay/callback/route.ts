import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { normalizeStatus } from "@/app/lib/maishapay";

/**
 * POST /api/maishapay/callback
 *
 * C'est l'URL que MaishaPay appellera avec le statut FINAL :
 *  - status_code 200 / transactionStatus SUCCESS → paiement OK
 *  - status_code 400 / transactionStatus FAILED  → échec
 *
 * ⚠️ IMPORTANT : ce endpoint doit être PUBLIC (pas d'auth utilisateur)
 *    et doit répondre 200 le plus vite possible.
 *    On doit être IDEMPOTENT : MaishaPay peut renvoyer le callback plusieurs fois.
 */
export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const reference: string | undefined =
    payload?.originatingTransactionId ?? payload?.transactionReference;

  if (!reference) {
    return NextResponse.json(
      { error: "originatingTransactionId manquant" },
      { status: 400 }
    );
  }

  const status = normalizeStatus(payload.transactionStatus);
  if (!status) {
    return NextResponse.json({ error: "Statut inconnu" }, { status: 400 });
  }

  // 1) Retrouver la transaction (elle a été créée à l'init)
  const tx = await prisma.transaction.findUnique({
    where: { transactionReference: reference },
    include: { contribution: true },
  });

  if (!tx) {
    console.warn("[Callback] Référence inconnue :", reference);
    // On répond 200 quand même pour ne pas déclencher de retry infini
    return NextResponse.json({ received: true, matched: false });
  }

  // 2) Idempotence : si déjà SUCCESS, on ignore
  if (tx.status === "SUCCESS") {
    return NextResponse.json({ received: true, alreadyProcessed: true });
  }

  // 3) Mise à jour atomique : Transaction + Contribution
  const cost = payload.order?.cost ?? {};

  await prisma.$transaction([
    prisma.transaction.update({
      where: { id: tx.id },
      data: {
        status,
        statusCode: payload.status_code ?? null,
        maishaTransactionId: payload.transactionId ?? tx.maishaTransactionId,
        amount: cost.amount ?? tx.amount,
        fees: cost.frais ?? tx.fees,
        total: cost.total ?? tx.total,
        currency: cost.currency ?? tx.currency,
        rawCallback: JSON.stringify(payload),
      },
    }),
    prisma.contribution.update({
      where: { id: tx.contributionId },
      data: {
        status,
        paidAt: status === "SUCCESS" ? new Date() : null,
      },
    }),
  ]);

  // (Optionnel) déclencher un email / SMS de confirmation ici

  return NextResponse.json({ received: true, status });
}

// MaishaPay peut éventuellement faire un GET de vérification
export async function GET() {
  return NextResponse.json({ ok: true });
}