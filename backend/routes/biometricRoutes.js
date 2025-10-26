import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  createEntry, 
  listEntries, 
  getLatestEntry, 
  updateEntry,
  deleteEntry 
} from '../controllers/biometricController.js';
import { 
  createBiometricSchema, 
  updateBiometricSchema,
  getBiometricsSchema 
} from '../validators/biometricSchemas.js';
import { mongoIdSchema } from '../validators/generalSchemas.js';

const router = Router();

// POST /api/biometrics
router.post('/', celebrate(createBiometricSchema), createEntry);

// GET /api/biometrics
router.get('/', celebrate(getBiometricsSchema), listEntries);

// GET /api/biometrics/latest
router.get('/latest', getLatestEntry);

// PUT /api/biometrics/:id
router.put('/:id', celebrate({...mongoIdSchema, ...updateBiometricSchema}), updateEntry);

// DELETE /api/biometrics/:id
router.delete('/:id', celebrate(mongoIdSchema), deleteEntry);

export default router;
