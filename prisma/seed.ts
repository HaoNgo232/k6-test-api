import path from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const DB_PATH = `file:${path.resolve(process.cwd(), 'dev.db')}`;

const adapter = new PrismaLibSql({
  url: DB_PATH
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`🌱 Seeding database at ${DB_PATH}...`);

  // Create test user
  const user = await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {},
    create: {
      username: 'testuser',
      password: 'testpassword',
    },
  });

  console.log('✅ Created test user:', user);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });