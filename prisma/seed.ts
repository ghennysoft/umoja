// import { UserRole } from '@/app/generated/prisma/enums';
import prisma from '@/app/lib/prisma';
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
      role: 'ADMIN',
    },
  });

  console.log('Seed terminé');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());