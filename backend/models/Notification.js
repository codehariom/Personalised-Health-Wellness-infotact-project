import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['reminder', 'achievement', 'social', 'system'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  scheduledFor: Date,
  sent: { type: Boolean, default: false }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', NotificationSchema);