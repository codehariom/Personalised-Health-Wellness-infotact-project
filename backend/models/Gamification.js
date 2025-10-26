import mongoose from 'mongoose';

const BadgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  icon: String,
  criteria: Object // Flexible criteria object
});

const StreakSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['workout', 'data_entry', 'login'], required: true },
  count: { type: Number, default: 0 },
  lastActivity: Date,
  bestStreak: { type: Number, default: 0 }
}, { timestamps: true });

const AchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge', required: true },
  earnedAt: { type: Date, default: Date.now }
});

export const Badge = mongoose.model('Badge', BadgeSchema);
export const Streak = mongoose.model('Streak', StreakSchema);
export const Achievement = mongoose.model('Achievement', AchievementSchema);