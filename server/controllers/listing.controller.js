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
        const { productName, productCategory, sortBy } = req.query;
        const conditions = {};
        if (productName || productCategory) {
            conditions.$or = [];

            if (productName) {
                conditions.$or.push({ productName: { $regex: productName, $options: 'i' } });
            }
            if (productCategory) {
                conditions.$or.push({ productCategory: { $regex: productCategory, $options: 'i' } });
            }
        }
        let searchResults;
        if (sortBy) {
            searchResults = await Listing.find(conditions).sort(sortBy);
        } else {
            searchResults = await Listing.find(conditions);
        }

        res.json(searchResults);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const adminDeleteListing = async (req, res, next) => {
    try {
        const { listingId } = req.body;
        const deletedListing = await Listing.findByIdAndDelete(listingId);
        if (!deletedListing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }
        res.json({ success: true, message: "Listing deleted successfully" });
    } catch (error) {
        console.error("Error deleting listing:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

