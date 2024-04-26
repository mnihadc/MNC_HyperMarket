import express from 'express';
import { createOrder, getOrders, getOrdersDetails } from '../controllers/order.controller.js';
const router = express.Router();

router.post('/create-order', createOrder);
router.get('/getOrders/:userId', getOrders);
router.get('/getOrderDetails/:orderId', getOrdersDetails);

export default router;