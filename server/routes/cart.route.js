import express from 'express';
import { addToCart, getCartProduct, getCartbyuserId } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addtocart/:userId/:productId', addToCart);
router.get('/getCart', getCartbyuserId);
router.get('/getCartProduct',getCartProduct);


export default router;