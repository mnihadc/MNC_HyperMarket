import Cart from "../models/cart.modal.js";
import Listing from "../models/listing.modal.js";
import { handleError } from "../utils/error.js";

export const addToCart = async (req, res, next) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        if (!productId || !quantity || isNaN(quantity) || quantity <= 0 || !userId) {
            return next(handleError(400, "Invalid request data."));
        }

        const existingCartItem = await Cart.findOne({ productId, userId });

        if (existingCartItem) {
            return next(handleError(400, "Product is already in the cart."));
        }

        const newCartItem = await Cart.create({ productId, quantity, userId });


        res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        next(handleError(500, "Internal Server Error"));
    }
};

export const getCartbyuserId = async (req, res, next) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (error) {
        next(error);

    }
};
export const getCartProduct = async (req, res, next) => {
    try {
        const CartProduct = await Listing.find();
        res.status(200).json(CartProduct);
    } catch (error) {
        next(error);

    }
};

export const updateCartQuantity = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        const updatedCartItem = await Cart.findOneAndUpdate(
            { _id: itemId },
            { quantity: quantity },
            { new: true }
        );

        res.status(200).json(updatedCartItem);
    } catch (error) {
        next(error);
    }
}
