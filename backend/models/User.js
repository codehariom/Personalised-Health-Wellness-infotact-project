import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, required: true },
  
  profile: {
    firstName: String,
    lastName: String,
    age: Number,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    heightCm: Number,
    weightKg: Number,
    activityLevel: { type: String, enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'], default: 'sedentary' }
  },
  
  goals: [{
    type: { type: String, enum: ['weight', 'steps', 'sleep', 'calories'], required: true },
    target: { type: Number, required: true },
    unit: String,
    deadline: Date
  }],
  
  gamification: {
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streaks: { type: Number, default: 0 },
    badges: [String]
  }
}, { timestamps: true });

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

UserSchema.statics.hashPassword = async function(password) {
  return bcrypt.hash(password, 10);
};

export const User = mongoose.model('User', UserSchema);
