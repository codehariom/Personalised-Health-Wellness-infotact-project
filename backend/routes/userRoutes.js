import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  getMyProfile, 
  updateMyProfile 
} from '../controllers/userController.js';
import { 
  profileUpdateSchema 
} from '../validators/profileSchemas.js';

const router = Router();

// GET /api/users/profile
router.get('/profile', getMyProfile);

// PUT /api/users/profile
router.put('/profile', celebrate(profileUpdateSchema), updateMyProfile);

export default router;