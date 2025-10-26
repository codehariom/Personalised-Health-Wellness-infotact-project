import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'achievement', 'question'], default: 'text' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const ExpertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, enum: ['fitness', 'nutrition', 'mental_health'], required: true },
  bio: String,
  verified: { type: Boolean, default: false },
  rating: { type: Number, min: 1, max: 5, default: 5 }
}, { timestamps: true });

export const Post = mongoose.model('Post', PostSchema);
export const Expert = mongoose.model('Expert', ExpertSchema);