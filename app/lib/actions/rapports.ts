'use server';

import prisma from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
// import {
//   startOfDay,
//   endOfDay,
//   startOfWeek,
//   endOfWeek,
//   startOfMonth,
//   endOfMonth,
//   startOfYear,
//   endOfYear,
// } from 'date-fns';

type Period = 'day' | 'week' | 'month' | 'year';

function getDateRange(period: Period | { start: string; end: string }) {
  if (typeof period === 'object') {
    return {
      gte: new Date(period.start),
      lte: new Date(period.end + 'T23:59:59'),
    };
  }
  
  const now = new Date();
  switch (period) {
    // case 'day':
    //   return { gte: startOfDay(now), lte: endOfDay(now) };
    // case 'week':
    //   return { gte: startOfWeek(now, { weekStartsOn: 1 }), lte: endOfWeek(now, { weekStartsOn: 1 }) };
    // case 'month':
    //   return { gte: startOfMonth(now), lte: endOfMonth(now) };
    // case 'year':
    //   return { gte: startOfYear(now), lte: endOfYear(now) };
    // default:
    //   return { gte: startOfDay(now), lte: endOfDay(now) };
  }
}

export async function getSalesReport(period: Period | { start: string; end: string }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  const dateRange = getDateRange(period);
  
  return prisma.sale.findMany({
    where: {
      createdAt: dateRange,
    },
    include: {
      client: true,
      user: true,
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getTopProducts(period: Period | { start: string; end: string }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  const dateRange = getDateRange(period);
  
  const topProducts = await prisma.saleItem.groupBy({
    by: ['productId'],
    where: {
      sale: {
        createdAt: dateRange,
      },
    },
    _sum: {
      quantity: true,
      total: true,
    },
    orderBy: {
      _sum: {
        quantity: 'desc',
      },
    },
    take: 10,
  });
  
  const productsWithDetails = await Promise.all(
    topProducts.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { name: true, reference: true, price: true },
      });
      return {
        productId: item.productId,
        product,
        totalQuantity: item._sum.quantity || 0,
        totalAmount: item._sum.total || 0,
      };
    })
  );
  
  return productsWithDetails;
}

export async function getLowStockReport() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  return prisma.product.findMany({
    where: {
      isActive: true,
      stock: {
        lte: prisma.product.fields.alertThreshold,
      },
    },
    include: { category: true },
    orderBy: { stock: 'asc' },
  });
}

export async function getCashierReport(period: Period | { start: string; end: string }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  const dateRange = getDateRange(period);
  
  const cashierSales = await prisma.sale.groupBy({
    by: ['userId'],
    where: {
      createdAt: dateRange,
    },
    _count: {
      id: true,
    },
    _sum: {
      totalAmount: true,
    },
  });
  
  const reportWithUsers = await Promise.all(
    cashierSales.map(async (item) => {
      const user = await prisma.user.findUnique({
        where: { id: item.userId },
        select: { name: true, email: true },
      });
      return {
        userId: item.userId,
        user,
        _count: { sales: item._count.id },
        totalAmount: item._sum.totalAmount || 0,
      };
    })
  );
  
  return reportWithUsers;
}

export async function exportReportPDF(period: Period | { start: string; end: string }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Non autorisé');
  
  const sales = await getSalesReport(period);
  const topProducts = await getTopProducts(period);
  
  // Créer un HTML simple pour le PDF
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Rapport DELKA</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #1e40af; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; }
        .total { font-weight: bold; font-size: 18px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>DELKA - Rapport d'activité</h1>
      <p>Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
      
      <h2>Ventes</h2>
      <table>
        <thead><tr><th>Facture</th><th>Date</th><th>Client</th><th>Caissier</th><th>Montant</th></tr></thead>
        <tbody>
          ${sales.map(s => `
            <tr>
              <td>${s.invoiceNumber}</td>
              <td>${new Date(s.createdAt).toLocaleDateString('fr-FR')}</td>
              <td>${s.client?.name || '-'}</td>
              <td>${s.user?.name}</td>
              <td>${s.totalAmount.toLocaleString()} FCFA</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="total">
        Total CA: ${sales.reduce((sum, s) => sum + s.totalAmount, 0).toLocaleString()} FCFA
      </div>
      
      <h2>Top produits</h2>
      <table>
        <thead><tr><th>Produit</th><th>Quantité vendue</th><th>CA généré</th></tr></thead>
        <tbody>
          ${topProducts.map(p => `
            <tr>
              <td>${p.product?.name || p.productId}</td>
              <td>${p.totalQuantity}</td>
              <td>${p.totalAmount.toLocaleString()} FCFA</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  // Retourner le HTML qui sera converti en PDF par le client
  return new Blob([html], { type: 'text/html' });
}

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
  
  const products = await prisma.product.findMany({ select: { price: true, stock: true } });
  const stockValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  
  return {
    salesToday: salesToday._sum.totalAmount || 0,
    salesMonth: salesMonth._sum.totalAmount || 0,
    lowStockCount,
    stockValue,
  };
}