import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

/**
 * GET /api/contributions/:reference/status
 * Permet au front de "poller" pour savoir si le client a validé son PIN.
 */
export async function GET(
  _req: Request,
  { params }: { params: { reference: string } }
) {
  const tx = await prisma.transaction.findUnique({
    where: { transactionReference: params.reference },
    include: { contribution: true },
  });

  if (!tx) {
    return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  }

  return NextResponse.json({
    reference: tx.transactionReference,
    status: tx.status,           // PENDING | SUCCESS | FAILED
    statusCode: tx.statusCode,
    amount: tx.amount,
    fees: tx.fees,
    total: tx.total,
    currency: tx.currency,
    paidAt: tx.contribution.paidAt,
    updatedAt: tx.updatedAt,
  });
}