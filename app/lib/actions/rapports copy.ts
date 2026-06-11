'use server';

import prisma from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

export async function getDashboardStats() {
  const today = new Date();
  const salesToday = await prisma.sale.aggregate({
    where: { createdAt: { gte: startOfDay(today), lte: endOfDay(today) } },
    _sum: { totalAmount: true },
  });
  const salesMonth = await prisma.sale.aggregate({
    where: { createdAt: { gte: startOfMonth(today), lte: endOfMonth(today) } },
    _sum: { totalAmount: true },
  });
  const lowStockCount = await prisma.product.count({
    where: { stock: { lte: prisma.product.fields.alertThreshold } },
  });
  const stockValue = await prisma.product.aggregate({
    _sum: { stock: true },
  });
  // Approximation: valeur stock = somme(prix * stock)
  const products = await prisma.product.findMany({ select: { price: true, stock: true } });
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  
  return {
    salesToday: salesToday._sum.totalAmount || 0,
    salesMonth: salesMonth._sum.totalAmount || 0,
    lowStockCount,
    stockValue: totalValue,
  };
}

export async function getSalesReport(period: 'day' | 'week' | 'month' | 'year') {
  // Implémentation simplifiée
  const sales = await prisma.sale.findMany({
    include: { items: { include: { product: true } }, user: true, client: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return sales;
}