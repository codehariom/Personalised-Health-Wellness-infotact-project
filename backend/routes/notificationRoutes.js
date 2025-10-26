import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  getNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  markMultipleAsRead,
  createReminder,
  updateNotification,
  deleteNotification,
  getUnreadCount
} from '../controllers/notificationController.js';
import { 
  createReminderSchema,
  getNotificationsSchema,
  updateNotificationSchema,
  markMultipleAsReadSchema
} from '../validators/notificationSchemas.js';
import { mongoIdSchema, paginationSchema } from '../validators/generalSchemas.js';

const router = Router();

// ===== GET NOTIFICATIONS =====
// GET /api/notifications
router.get('/', celebrate({...getNotificationsSchema, ...paginationSchema}), getNotifications);

// GET /api/notifications/unread-count
router.get('/unread-count', getUnreadCount);

// GET /api/notifications/:id
router.get('/:id', celebrate(mongoIdSchema), getNotificationById);

// ===== UPDATE NOTIFICATIONS =====
// PUT /api/notifications/:id
router.put('/:id', celebrate({...mongoIdSchema, ...updateNotificationSchema}), updateNotification);

// PUT /api/notifications/:id/read
router.put('/:id/read', celebrate(mongoIdSchema), markAsRead);

// PUT /api/notifications/read-all
router.put('/read-all', markAllAsRead);

// PUT /api/notifications/read-multiple
router.put('/read-multiple', celebrate(markMultipleAsReadSchema), markMultipleAsRead);

// ===== CREATE NOTIFICATIONS =====
// POST /api/notifications/reminders
router.post('/reminders', celebrate(createReminderSchema), createReminder);

// ===== DELETE NOTIFICATIONS =====
// DELETE /api/notifications/:id
router.delete('/:id', celebrate(mongoIdSchema), deleteNotification);

export default router;