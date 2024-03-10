import Cart from "../models/cart.modal.js";
import { handleError } from "../utils/error.js";

export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; 

        if (!productId || !quantity || isNaN(quantity) || quantity <= 0 || !userId) {
            return next(handleError(404, "invalid request data."));
        }

        const existingCartItem = await Cart.findOne({ productId, user: userId });

        if (existingCartItem) {
            return next(handleError(404, "Product is already in the cart."));
        }

        const newCartItem = await Cart.create({ productId, quantity, user: userId });
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        next(error);
    }
}