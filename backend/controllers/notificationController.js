// controllers/notificationController.js

import { Notification } from '../models/Notification.js';

// GET /api/notifications
export const getNotifications = async (req, res) => {
  const { read, limit = 20 } = req.query;
  const filter = { userId: req.user.id, ...(read !== undefined && { read: read === 'true' }) };
  const notes = await Notification.find(filter).sort({ createdAt: -1 }).limit(Number(limit));
  res.json({ notes });
};

// GET /api/notifications/unread-count
export const getUnreadCount = async (req, res) => {
  const count = await Notification.countDocuments({ userId: req.user.id, read: false });
  res.json({ count });
};

// GET /api/notifications/:id
export const getNotificationById = async (req, res) => {
  const note = await Notification.findOne({ _id: req.params.id, userId: req.user.id });
  if (!note) return res.status(404).json({ message: 'Not found' });
  res.json({ note });
};

// PUT /api/notifications/:id
export const updateNotification = async (req, res) => {
  try {
    const note = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Not found' });
    res.json({ note });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/notifications/:id/read
export const markAsRead = async (req, res) => {
  await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { read: true }
  );
  res.json({ message: 'Marked as read' });
};

// PUT /api/notifications/read-all
export const markAllAsRead = async (req, res) => {
  await Notification.updateMany({ userId: req.user.id }, { read: true });
  res.json({ message: 'All marked as read' });
};

// PUT /api/notifications/read-multiple
export const markMultipleAsRead = async (req, res) => {
  const { notificationIds } = req.body;
  await Notification.updateMany(
    { _id: { $in: notificationIds }, userId: req.user.id },
    { read: true }
  );
  res.json({ message: 'Selected marked as read' });
};

// POST /api/notifications/reminders
export const createReminder = async (req, res) => {
  try {
    const { title, message, scheduledFor } = req.body;
    const reminder = await Notification.create({
      userId: req.user.id,
      type: 'reminder',
      title,
      message,
      scheduledFor
    });
    res.status(201).json({ reminder });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/notifications/:id
export const deleteNotification = async (req, res) => {
  await Notification.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Deleted' });
};
