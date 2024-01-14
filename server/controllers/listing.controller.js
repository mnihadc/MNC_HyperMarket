import Listing from "../models/listing.modal.js";

export const createListings = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
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