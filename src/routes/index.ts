import express from 'express';
import bookRoutes from './book/book-routes';

const router = express.Router();
router.use('/book', bookRoutes);

export default router;