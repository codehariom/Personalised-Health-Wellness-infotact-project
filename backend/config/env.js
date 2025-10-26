import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/wellness-app', 
  jwtSecret: process.env.ACCESS_TOKEN_SECRET || 'fallback-secret', 
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'fallback-refresh-secret', 
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', 
  accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES || '15m',
  refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES || '7d'
};

console.log('Config loaded:', {
  port: config.port,
  nodeEnv: config.nodeEnv,
  mongoUri: config.mongoUri ? 'SET' : 'MISSING',
  jwtSecret: config.jwtSecret ? 'SET' : 'MISSING',
  refreshTokenSecret: config.refreshTokenSecret ? 'SET' : 'MISSING',
  clientOrigin: config.clientOrigin
});
