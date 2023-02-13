import { Router } from 'express';
import games from './GamesRoutes.js';
import customers from './CustomersRoutes.js';
import rentals from './ReantalsRoutes.js';

const router = Router();

router.use('/games', games);
router.use('/customers', customers);
router.use('/rentals', rentals);

export default router;