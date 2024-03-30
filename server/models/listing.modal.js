import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    offerPrice: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Array,
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
    imageUrls: {
        type: Array,
        required: true,
    },
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
