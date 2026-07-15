import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set to seed the database.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  await prisma.systemMetadata.upsert({
    where: { key: "prisma.foundation" },
    create: {
      key: "prisma.foundation",
      value: "Prisma technical foundation configured",
    },
    update: {
      value: "Prisma technical foundation configured",
    },
  });
}

try {
  await main();
  console.log("Prisma technical foundation seed completed.");
} finally {
  await prisma.$disconnect();
}
