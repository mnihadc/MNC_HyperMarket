import mongoose from 'mongoose';;

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['UPI', 'Net Banking', 'Cash on Delivery'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

