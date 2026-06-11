'use server';

import prisma from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getStockProducts() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  return prisma.product.findMany({
    include: { category: true },
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });
}

export async function getStockMovements() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  return prisma.stockMovement.findMany({
    include: { product: true, user: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
}

export async function addStock(productId: string, quantity: number, reason: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error('Produit non trouvé');
  
  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id: productId },
      data: { stock: { increment: quantity } },
    });
    
    await tx.stockMovement.create({
      data: {
        productId,
        quantity,
        type: 'IN',
        reason: reason || 'Ajout manuel',
        userId: session.user.id,
      },
    });
    
    await tx.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'ADD_STOCK',
        entity: 'Product',
        entityId: productId,
        details: `Ajout de ${quantity} ${product.unit}`,
      },
    });
  });
  
  revalidatePath('/admin/stocks');
}

export async function removeStock(productId: string, quantity: number, reason: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error('Produit non trouvé');
  if (product.stock < quantity) throw new Error('Stock insuffisant');
  
  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id: productId },
      data: { stock: { decrement: quantity } },
    });
    
    await tx.stockMovement.create({
      data: {
        productId,
        quantity: -quantity,
        type: 'OUT',
        reason: reason || 'Retrait manuel',
        userId: session.user.id,
      },
    });
    
    await tx.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'REMOVE_STOCK',
        entity: 'Product',
        entityId: productId,
        details: `Retrait de ${quantity} ${product.unit}`,
      },
    });
  });
  
  revalidatePath('/admin/stocks');
}

export async function adjustStock(productId: string, newStock: number, reason: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error('Produit non trouvé');
  
  const difference = newStock - product.stock;
  
  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id: productId },
      data: { stock: newStock },
    });
    
    await tx.stockMovement.create({
      data: {
        productId,
        quantity: difference,
        type: 'ADJUSTMENT',
        reason: reason || `Ajustement de ${product.stock} à ${newStock}`,
        userId: session.user.id,
      },
    });
    
    await tx.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'ADJUST_STOCK',
        entity: 'Product',
        entityId: productId,
        details: `Ajustement de ${product.stock} à ${newStock}`,
      },
    });
  });
  
  revalidatePath('/admin/stocks');
}