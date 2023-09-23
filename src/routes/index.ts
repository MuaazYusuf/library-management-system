import express from 'express';
import bookRoutes from './book/book-routes';
import userRoutes from './user/user-router'

const router = express.Router();
router.use('/book', bookRoutes);
router.use('/user', userRoutes)

export default router;