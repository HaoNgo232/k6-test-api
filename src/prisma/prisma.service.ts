import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

class PrismaService {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      const adapter = new PrismaLibSql({
        url: 'file:./dev.db'
      });
      PrismaService.instance = new PrismaClient({ adapter });
    }
    return PrismaService.instance;
  }

  static async connect(): Promise<void> {
    const prisma = PrismaService.getInstance();
    await prisma.$connect();
    console.log('✅ Database connected');
  }

  static async disconnect(): Promise<void> {
    const prisma = PrismaService.getInstance();
    await prisma.$disconnect();
    console.log('❌ Database disconnected');
  }
}

export const prisma = PrismaService.getInstance();
export default PrismaService;
