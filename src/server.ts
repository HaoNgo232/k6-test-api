import app from './app';
import PrismaService from './prisma/prisma.service';
import { config } from './config/env.config';

const PORT = config.server.port;

async function bootstrap() {
  try {
    // Connect to database
    await PrismaService.connect();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth endpoint: http://localhost:${PORT}/api/auth/login`);
      console.log(`📦 Items endpoint: http://localhost:${PORT}/api/items`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down...');
  await PrismaService.disconnect();
  process.exit(0);
});

bootstrap();
