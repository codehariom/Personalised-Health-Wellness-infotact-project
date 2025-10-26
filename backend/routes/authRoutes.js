import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  signup, 
  login, 
  logout 
} from '../controllers/authController.js';
import { 
  signupSchema, 
  loginSchema 
} from '../validators/authSchemas.js';

const router = Router();

// POST /api/auth/signup
router.post('/signup', celebrate(signupSchema), signup);

// POST /api/auth/login
router.post('/login', celebrate(loginSchema), login);

// POST /api/auth/logout
router.post('/logout', logout);

export default router;