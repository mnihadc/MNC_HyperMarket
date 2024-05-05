import express from 'express';
import { createOrder, deleteOrder, getOrders, getOrdersDetails } from '../controllers/order.controller.js';
const router = express.Router();

router.post('/create-order', createOrder);
router.get('/getOrders/:userId', getOrders);
router.get('/getOrderDetails/:orderId', getOrdersDetails);
router.delete('/deleteOrder/:orderId', deleteOrder);

export default router;