import { Role } from '@/app/generated/prisma/enums';
import prisma from '@/app/lib/db';
import bcrypt from 'bcryptjs';

// const prisma = new PrismaClient();

async function main() {
  // Créer admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: adminPassword,
      role: Role.Admin,
    },
  });

  // Créer caissier
  const cashierPassword = await bcrypt.hash('cashier123', 10);
  await prisma.user.upsert({
    where: { email: 'agent@gmail.com' },
    update: {},
    create: {
      email: 'agent@gmail.com',
      password: cashierPassword,
      role: Role.Agent,
    },
  });

  console.log('Seed terminé');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());