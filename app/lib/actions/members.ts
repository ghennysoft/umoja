'use server';

import prisma from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';


export async function getMembers() {
  const members = await prisma.member.findMany({
    // include: { category: true },
    // orderBy: { name: 'asc' },
  });
  return members;
}

export async function createMember(data: any) {
  // const session = await getServerSession(authOptions);
  // if (session?.user?.role !== 'Admin') throw new Error('Non autorisé');
  
  const member = await prisma.member.create({
    data: data,
  });
  
  // await prisma.auditLog.create({
  //   data: {
  //     userId: session.user.id,
  //     action: 'CREATE_member',
  //     entity: 'member',
  //     entityId: member.id,
  //   },
  // });
  
  revalidatePath('/dashboard/members');
  return member;
}

// export async function updatemember(id: string, data: any) {
//   const session = await getServerSession(authOptions);
//   if (session?.user?.role !== 'ADMIN') throw new Error('Non autorisé');
  
//   const member = await prisma.member.update({
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
//       action: 'UPDATE_member',
//       entity: 'member',
//       entityId: id,
//     },
//   });
//   revalidatePath('/admin/produits');
//   return member;
// }

// export async function deletemember(id: string) {
//   const session = await getServerSession(authOptions);
//   if (session?.user?.role !== 'ADMIN') throw new Error('Non autorisé');
  
//   await prisma.member.delete({ where: { id } });
//   await prisma.auditLog.create({
//     data: {
//       userId: session.user.id,
//       action: 'DELETE_member',
//       entity: 'member',
//       entityId: id,
//     },
//   });
//   revalidatePath('/admin/produits');
// }
