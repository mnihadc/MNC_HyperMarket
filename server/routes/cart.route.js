import express from 'express';
import { addToCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addtocart/:userId/:productId', addToCart);

export default router;