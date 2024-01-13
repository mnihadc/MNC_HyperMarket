import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    offerPrice: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
