import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User } from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies?.refreshToken) {
      token = req.cookies.refreshToken;
    }

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id || decoded.userId).select('-passwordHash');
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = { id: user._id };
    next();
  } catch (error) {
    console.error('Auth middleware failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
