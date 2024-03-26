import express from 'express';
import { addToCart, getCartProduct, getCartbyuserId, updateCartQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addtocart/:userId/:productId', addToCart);
router.get('/getCart', getCartbyuserId);
router.get('/getCartProduct', getCartProduct);
router.post('/updateCartQuantity/:userId/:itemId', updateCartQuantity);

export default router;
