const listingSchema = new mongoose.Schema({
    offerPrice: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    quantity: [{
        size: {
            type: String,
            required: true
        }
    }],
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
