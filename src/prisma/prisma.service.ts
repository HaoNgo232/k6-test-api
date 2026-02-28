import path from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

// Resolve DB path relative to project root (where package.json is)
const DB_PATH = `file:${path.resolve(process.cwd(), 'dev.db')}`;

class PrismaService {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      const adapter = new PrismaLibSql({
        url: DB_PATH
      });
      PrismaService.instance = new PrismaClient({ adapter });
    }
    return PrismaService.instance;
  }

  static async connect(): Promise<void> {
    const prisma = PrismaService.getInstance();
    await prisma.$connect();
    console.log(`✅ Database connected (${DB_PATH})`);
  }

  static async disconnect(): Promise<void> {
    const prisma = PrismaService.getInstance();
    await prisma.$disconnect();
    console.log('❌ Database disconnected');
  }
}

export const prisma = PrismaService.getInstance();
export default PrismaService;