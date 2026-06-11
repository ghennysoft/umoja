'use server';

import prisma from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { revalidatePath } from 'next/cache';
import { format } from 'date-fns';

export async function searchProducts(query: string) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { reference: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 20,
  });
}

export async function createSale(data: {
  items: { productId: string; quantity: number; unitPrice: number }[];
  clientName?: string;
  clientPhone?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non authentifié');

  // Vérifier stock
  for (const item of data.items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product || product.stock < item.quantity) {
      throw new Error(`Stock insuffisant pour ${product?.name}`);
    }
  }

  // Générer numéro facture
  const lastSale = await prisma.sale.findFirst({ orderBy: { createdAt: 'desc' } });
  const lastNumber = lastSale?.invoiceNumber ? parseInt(lastSale.invoiceNumber.split('-')[1]) : 0;
  const invoiceNumber = `FACT-${String(lastNumber + 1).padStart(6, '0')}`;

  // Créer ou récupérer client
  let clientId: string | undefined;
  if (data.clientName) {
    const client = await prisma.client.upsert({
      where: { phone: data.clientPhone || '' },
      update: {},
      create: { name: data.clientName, phone: data.clientPhone || '' },
    });
    clientId = client.id;
  }

  // Créer vente et lignes
  const sale = await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.create({
      data: {
        invoiceNumber,
        clientId,
        userId: session.user.id,
        totalAmount: data.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      },
    });

    for (const item of data.items) {
      await tx.saleItem.create({
        data: {
          saleId: sale.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.unitPrice * item.quantity,
        },
      });
      // Décrémenter stock
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
      // Mouvement stock
      await tx.stockMovement.create({
        data: {
          productId: item.productId,
          quantity: -item.quantity,
          type: 'OUT',
          reason: `Vente ${invoiceNumber}`,
          userId: session.user.id,
        },
      });
    }

    // Paiement
    await tx.payment.create({
      data: {
        saleId: sale.id,
        method: 'CASH',
        amount: sale.totalAmount,
        status: 'PAID',
      },
    });

    // Audit
    await tx.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'CREATE_SALE',
        entity: 'Sale',
        entityId: sale.id,
        details: `Montant ${sale.totalAmount}`,
      },
    });

    return sale;
  });

  revalidatePath('/caisse/historique');
  revalidatePath('/admin/rapports');
  return sale;
}

export async function getUserSales() {
  const session = await getServerSession(authOptions);
  if (!session) return [];
  return prisma.sale.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } }, client: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
}