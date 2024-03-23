import express from 'express';
import { addToCart, getCartbyuserId } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addtocart/:userId/:productId', addToCart);
router.get('/getCart', getCartbyuserId);

export default router;