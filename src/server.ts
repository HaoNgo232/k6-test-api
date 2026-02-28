import app from './app';
import PrismaService from './prisma/prisma.service';
import { config } from './config/env.config';

const PORT = config.server.port;

let server: ReturnType<typeof app.listen>;

async function bootstrap() {
  try {
    // Connect to database
    await PrismaService.connect();

    // Start server
    server = app.listen(PORT, () => {
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

// Graceful shutdown handler - works for both local (SIGINT) and K8s (SIGTERM)
async function gracefulShutdown(signal: string) {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);

  // Stop accepting new connections
  if (server) {
    server.close(() => {
      console.log('✅ HTTP server closed');
    });
  }

  // Disconnect database
  await PrismaService.disconnect();

  process.exit(0);
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

bootstrap();