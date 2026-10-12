import "dotenv/config";

import { prisma } from "@/shared/lib/prisma";
import { hashPassword } from "@/shared/lib/password";

const email = process.argv[2]?.trim().toLowerCase();
const password = process.argv[3];

if (!email || !password) {
  console.error("Нужны почта и пароль: tsx prisma/create-user.ts email password");
  process.exit(1);
}

const main = async () => {
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash: await hashPassword(password) },
    create: {
      email,
      passwordHash: await hashPassword(password),
    },
  });

  console.log("saved", email);
  await prisma.$disconnect();
};

main();
