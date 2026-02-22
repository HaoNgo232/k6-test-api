import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    url: 'file:./prisma/dev.db', // SQLite file path
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-this',
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
};

export default config;
