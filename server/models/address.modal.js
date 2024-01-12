import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

export default Address;
