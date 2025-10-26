import mongoose from 'mongoose';

const BiometricEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['weight', 'heart_rate', 'steps', 'sleep', 'calories', 'blood_pressure', 'spo2'],
    required: true
  },
  value: { type: Number, required: true },
  unit: { type: String, required: true },
  source: { type: String, enum: ['manual', 'api'], default: 'manual' },
  recordedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const BiometricEntry = mongoose.model('BiometricEntry', BiometricEntrySchema);
