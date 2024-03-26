import Listing from "../models/listing.modal.js";

export const createListings = async (req, res, next) => {
    try {
        const { offerPrice, mrp, productName, productCategory, description, imageUrls, quantity } = req.body;
        
        if (!Array.isArray(quantity) || quantity.some(item => typeof item !== 'object' || !item.size)) {
            return res.status(400).json({ error: 'Invalid quantity format. Please provide an array of objects with a size property.' });
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