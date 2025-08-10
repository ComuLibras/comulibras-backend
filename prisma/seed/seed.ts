import { PrismaClient, Roles } from '@prisma/client';

import { BcryptyHashProvider } from '@shared/providers/hash-provider/bcrypt-hash-providers';

export const seed = async() => {
  const prisma = new PrismaClient();
  const hashProvider = new BcryptyHashProvider();

  const hashedPassword = await hashProvider.encrypt(process.env.SUPER_ADMIN_PASSWORD ?? '');

  const account = await prisma.account.findFirst({
    where: {
      email: 'comulibras@gmail.com',
    },
  });

  if (account) {
    return;
  }

  await prisma.account.create({
    data: {
      name: 'ComuLibras',
      email: 'comulibras@gmail.com',
      password: hashedPassword,
      role: Roles.ADMIN,
      isPasswordCreated: true,
      isActive: true,
    },
  });
};

seed();
