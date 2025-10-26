import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  createPost, 
  getPosts, 
  getPostById,
  likePost, 
  addComment,
  deletePost,
  getExperts,
  getExpertById,
  createExpert,
  bookExpert,
  getMyBookings
} from '../controllers/communityController.js';
import { 
  createPostSchema,
  addCommentSchema,
  getPostsSchema,
  createExpertSchema,
  bookExpertSchema
} from '../validators/communitySchemas.js';
import { mongoIdSchema, paginationSchema } from '../validators/generalSchemas.js';

const router = Router();

// ===== POSTS =====
// POST /api/community/posts
router.post('/posts', celebrate(createPostSchema), createPost);

// GET /api/community/posts
router.get('/posts', celebrate({...getPostsSchema, ...paginationSchema}), getPosts);

// GET /api/community/posts/:id
router.get('/posts/:id', celebrate(mongoIdSchema), getPostById);

// PUT /api/community/posts/:id/like
router.put('/posts/:id/like', celebrate(mongoIdSchema), likePost);

// POST /api/community/posts/:id/comments
router.post('/posts/:id/comments', celebrate({...mongoIdSchema, ...addCommentSchema}), addComment);

// DELETE /api/community/posts/:id
router.delete('/posts/:id', celebrate(mongoIdSchema), deletePost);

// ===== EXPERTS =====
// GET /api/community/experts
router.get('/experts', celebrate(paginationSchema), getExperts);

// GET /api/community/experts/:id
router.get('/experts/:id', celebrate(mongoIdSchema), getExpertById);

// POST /api/community/experts (Apply to become expert)
router.post('/experts', celebrate(createExpertSchema), createExpert);

// POST /api/community/experts/book
router.post('/experts/book', celebrate(bookExpertSchema), bookExpert);

// GET /api/community/bookings (My bookings)
router.get('/bookings', getMyBookings);

export default router;