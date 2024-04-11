import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    offerprice: {
        type: Number,
        required: true,
    },
    mrP: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
