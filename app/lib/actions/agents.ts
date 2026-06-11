'use server';

import prisma from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';


export async function getAgents() {
  const agents = await prisma.agent.findMany({
    // include: { category: true },
    // orderBy: { name: 'asc' },
  });
  return { agents };
}

export async function createAgent(data: any) {
  // const session = await getServerSession(authOptions);
  // if (session?.user?.role !== 'Admin') throw new Error('Non autorisé');
  
  const agent = await prisma.agent.create({
    data: data,
  });
  
  // await prisma.auditLog.create({
  //   data: {
  //     userId: session.user.id,
  //     action: 'CREATE_AGENT',
  //     entity: 'Agent',
  //     entityId: agent.id,
  //   },
  // });
  
  revalidatePath('/dashboard/agents');
  return agent;
}

// export async function updateagent(id: string, data: any) {
//   const session = await getServerSession(authOptions);
//   if (session?.user?.role !== 'ADMIN') throw new Error('Non autorisé');
  
//   const agent = await prisma.agent.update({
//     where: { id },
//     data: {
//       name: data.name,
//       reference: data.reference,
//       categoryId: data.categoryId,
//       price: parseFloat(data.price),
//       stock: parseInt(data.stock),
//       alertThreshold: parseInt(data.alertThreshold),
//     },
//   });
  
//   await prisma.auditLog.create({
//     data: {
//       userId: session.user.id,
//       action: 'UPDATE_agent',
//       entity: 'agent',
//       entityId: id,
//     },
//   });
//   revalidatePath('/admin/produits');
//   return agent;
// }

// export async function deleteagent(id: string) {
//   const session = await getServerSession(authOptions);
//   if (session?.user?.role !== 'ADMIN') throw new Error('Non autorisé');
  
//   await prisma.agent.delete({ where: { id } });
//   await prisma.auditLog.create({
//     data: {
//       userId: session.user.id,
//       action: 'DELETE_agent',
//       entity: 'agent',
//       entityId: id,
//     },
//   });
//   revalidatePath('/admin/produits');
// }
