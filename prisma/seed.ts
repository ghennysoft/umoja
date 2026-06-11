import { Role } from '@/app/generated/prisma/enums';
import prisma from '@/app/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  // Créer admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      name: 'Administrateur',
      email: 'admin@gmail.com',
      password: adminPassword,
      role: Role.Admin,
    },
  });

  // Créer agent
  const cashierPassword = await bcrypt.hash('agent123', 10);
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