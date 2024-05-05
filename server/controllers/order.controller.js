import Order from "../models/order.modal.js";
import Cart from "../models/cart.modal.js";

export const createOrder = async (req, res) => {
    try {
        const { user, cart, addressId, paymentMethod, totalPrice } = req.body;

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

export const getOrders = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const order = await Order.find({ user: userId });
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

export const getOrdersDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { userId, orderId } = req.params;
        await Order.findOneAndDelete({ _id: orderId, userId: userId });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
