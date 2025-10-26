import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errors as celebrateErrors } from 'celebrate';

import { config } from './config/env.js';
import { connectDB } from './config/db.js';

//routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import biometricRoutes from './routes/biometricRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import mealPlanRoutes from './routes/mealPlanRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import gamificationRoutes from './routes/gamificationRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

import { requireAuth } from './middleware/auth.js';

const app = express();

// Database connection
connectDB();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => res.json({ ok: true, timestamp: new Date().toISOString() }));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes 
app.use('/api/users', requireAuth, userRoutes);
app.use('/api/biometrics', requireAuth, biometricRoutes);
app.use('/api/recommendations', requireAuth, recommendationRoutes);
app.use('/api/workouts', requireAuth, workoutRoutes);
app.use('/api/meal-plans', requireAuth, mealPlanRoutes);
app.use('/api/community', requireAuth, communityRoutes);
app.use('/api/gamification', requireAuth, gamificationRoutes);
app.use('/api/notifications', requireAuth, notificationRoutes);
app.use('/api/analytics', requireAuth, analyticsRoutes);

// Celebrate error handler
app.use(celebrateErrors());

// General error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({ 
    message: err.message || 'Server error',
    ...(config.nodeEnv === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const port = config.port || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Client Origin: ${config.clientOrigin}`);
});