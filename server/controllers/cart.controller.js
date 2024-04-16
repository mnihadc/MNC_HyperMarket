import Cart from "../models/cart.modal.js";
import Listing from "../models/listing.modal.js";
import { handleError } from "../utils/error.js";
export const addToCart = async (req, res, next) => {
    try {
        const { userId, productId } = req.params;
        const { quantity, size, offerprice, mrP } = req.body;
        if (!productId || !quantity || !size || !offerprice || !mrP || isNaN(quantity) || quantity <= 0 || !userId) {
            return next(handleError(400, "Invalid request data."));
        }

        const existingCartItem = await Cart.findOne({ productId, userId });

        if (existingCartItem) {
            return next(handleError(400, "Product is already in the cart."));
        }

        const newCartItem = await Cart.create({ productId, quantity, userId, size, offerprice, mrP });

        res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        next(handleError(500, "Internal Server Error"));
    }
};

export const getCartbyuserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.find({ userId: userId });
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
        const { userId, itemId } = req.params;
        const { quantity } = req.body;
        const updatedCartItem = await Cart.findOneAndUpdate(
            { userId: userId, productId: itemId }, // Query
            { quantity: quantity }, // Update
            { new: true } // Options
        );

        res.status(200).json(updatedCartItem);
    } catch (error) {
        next(error);
    }
};

export const updateCartProductSize = async (req, res, next) => {
    const { userId, itemId } = req.params;
    const { size } = req.body;

    try {
        const updatedCartItem = await Cart.findOneAndUpdate(
            { userId: userId, productId: itemId }, // Query
            { size: size }, // Update
            { new: true } // Options
        );

        if (updatedCartItem) {
            res.status(200).json({ message: 'Cart item size updated successfully', updatedCartItem });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error updating cart item size:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const updateCartPrice = async (req, res, next) => {
    const { userId, itemId } = req.params;
    const { offerprice, mrP } = req.body;

    try {
        const updatedCartItem = await Cart.findOneAndUpdate(
            { userId: userId, productId: itemId }, // Query
            { offerprice: offerprice, mrP: mrP }, // Update
            { new: true } // Options
        );

        if (updatedCartItem) {
            res.status(200).json({ message: 'Cart item price updated successfully', updatedCartItem });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error updating cart item price:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const removeCartProduct = async (req, res, next) => {
    try {
        const { userId, itemId } = req.params;
        const removedCartItem = await Cart.findOneAndDelete({ productId: itemId, userId: userId });

        if (removedCartItem) {
            res.status(200).json({ message: 'Cart item removed successfully' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
