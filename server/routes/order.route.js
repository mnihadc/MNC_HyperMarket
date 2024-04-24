import express from 'express';
import { createOrder, getOrders } from '../controllers/order.controller.js';
const router = express.Router();

router.post('/create-order', createOrder);
router.get('/getOrders/:userId',getOrders);

export default router;