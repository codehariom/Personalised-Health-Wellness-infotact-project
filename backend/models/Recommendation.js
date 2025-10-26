import mongoose from 'mongoose';

const RecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['workout', 'meal', 'wellness', 'goal'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  reasoning: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['pending', 'accepted', 'dismissed', 'completed'], default: 'pending' },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

export const Recommendation = mongoose.model('Recommendation', RecommendationSchema);
