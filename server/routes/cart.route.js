import express from 'express';
import { addToCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/addtocart/:userId/:productId', verifyToken, addToCart);

export default router;