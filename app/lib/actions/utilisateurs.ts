'use server';

import prisma from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export async function getUsers() {
 // const session = await getServerSession(authOptions);
 // if (session?.user?.role !== 'Admin') throw new Error('Non autorisé');
  
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
 // const session = await getServerSession(authOptions);
 // if (session?.user?.role !== 'Admin') throw new Error('Non autorisé');
  
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) throw new Error('Email déjà utilisé');
  
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role as any,
    },
  });
  
  // await prisma.auditLog.create({
  //   data: {
  //     userId: session.user.id,
  //     action: 'CREATE_USER',
  //     entity: 'User',
  //     entityId: user.id,
  //     details: `Création utilisateur ${data.email}`,
  //   },
  // });
  
  revalidatePath('/admin/utilisateurs');
  return user;
}

// export async function updateUser(id: string, data: { name: string; email: string; role: string }) {
//   const session = await getServerSession(authOptions);
//   if (session?.user?.role !== 'Admin') throw new Error('Non autorisé');
  
//   const user = await prisma.user.update({
//     where: { id },
//     data: {
//       name: data.name,
//       email: data.email,
//       role: data.role as any,
//     },
//   });
  
//   await prisma.auditLog.create({
//     data: {
//       userId: session.user.id,
//       action: 'UPDATE_USER',
//       entity: 'User',
//       entityId: id,
//     },
//   });
  
//   revalidatePath('/admin/utilisateurs');
//   return user;
// }

// export async function deleteUser(id: string) {
//   const session = await getServerSession(authOptions);
//   if (session?.user?.role !== 'Admin') throw new Error('Non autorisé');
  
//   const user = await prisma.user.findUnique({ where: { id } });
//   if (user?.role === 'Admin') throw new Error('Impossible de supprimer un administrateur');
  
//   await prisma.user.delete({ where: { id } });
  
//   await prisma.auditLog.create({
//     data: {
//       userId: session.user.id,
//       action: 'DELETE_USER',
//       entity: 'User',
//       entityId: id,
//     },
//   });
  
//   revalidatePath('/admin/utilisateurs');
// }

// export async function resetUserPassword(id: string, newPassword: string) {
//   const session = await getServerSession(authOptions);
//   if (session?.user?.role !== 'Admin') throw new Error('Non autorisé');
  
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
  
//   await prisma.user.update({
//     where: { id },
//     data: { password: hashedPassword },
//   });
  
//   await prisma.auditLog.create({
//     data: {
//       userId: session.user.id,
//       action: 'RESET_PASSWORD',
//       entity: 'User',
//       entityId: id,
//     },
//   });
  
//   revalidatePath('/admin/utilisateurs');
// }
