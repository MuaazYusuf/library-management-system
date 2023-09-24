import express from 'express';
import bookRoutes from './book/book-routes';
import userRoutes from './user/user-router'
import apiRateLimitMiddleware from '../helpers/apiLimiter';

const router = express.Router();
router.use('/book', apiRateLimitMiddleware, bookRoutes);
router.use('/user', apiRateLimitMiddleware, userRoutes);

export default router;