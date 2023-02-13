import { Router } from 'express';
import gamesRouter from './GamesRoutes.js';
import customersRouter from './CustomersRoutes.js';
// import rentals from './ReantalsRoutes.js';

const router = Router();

router.use('/games', gamesRouter);
router.use('/customers', customersRouter);
// router.use('/rentals', rentals);

export default router;