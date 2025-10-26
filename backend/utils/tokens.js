import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, config.refreshTokenSecret, { expiresIn: '7d' });
};