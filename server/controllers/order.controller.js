import Order from "../models/order.modal.js";
import Cart from "../models/cart.modal.js";

export const createOrder = async (req, res) => {
    try {
        const { user, cart, addressId, paymentMethod ,totalPrice } = req.body;

        const order = new Order({
            user,
            cart,
            totalPrice: totalPrice,
            address: addressId,
            paymentMethod
        });
        const savedOrder = await order.save();
        const cartItemIds = cart.map(item => item._id);
        await Cart.deleteMany({ _id: { $in: cartItemIds } });
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
