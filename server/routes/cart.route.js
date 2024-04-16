import express from 'express';
import { addToCart, getCartProduct, getCartbyuserId, removeCartProduct, updateCartPrice, updateCartProductSize, updateCartQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addtocart/:userId/:productId', addToCart);
router.get('/getCart/:userId', getCartbyuserId);
router.get('/getCartProduct', getCartProduct);
router.post('/updateCartQuantity/:userId/:itemId', updateCartQuantity);
router.post('/updateCartProductSize/:userId/:itemId', updateCartProductSize);
router.post('/updateCartPrice/:userId/:itemId', updateCartPrice);
router.delete('/removeCartProduct/:userId/:itemId', removeCartProduct);


export default router;
