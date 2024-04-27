import Listing from "../models/listing.modal.js";

export const createListings = async (req, res, next) => {
    try {
        const { productName, productCategory, description, imageUrls, quantity, offers } = req.body;

        const offerPrice = offers.map(offer => offer.offerPrice);
        const mrp = offers.map(offer => offer.mrp);

        if (!Array.isArray(quantity) || quantity.some(item => typeof item !== 'string')) {
            return res.status(400).json({ error: 'Invalid quantity format. Please provide an array of strings.' });
        }

        const listing = await Listing.create({ offerPrice, mrp, productName, productCategory, description, imageUrls, quantity });
        return res.status(201).json(listing);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', details: error.errors });
        } else {
            next(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const showListings = async (req, res, next) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};

export const Search = async (req, res, next) => {
    try {
        const { category, productName } = req.query;
        const conditions = {};
        if (category) {
            conditions.category = category;
        }
        if (productName) {
            conditions.productName = { $regex: productName, $options: 'i' }; 
        }
        const searchResults = await Listing.find(conditions);
        res.json(searchResults);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
