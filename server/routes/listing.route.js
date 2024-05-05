import express from 'express';
import { Search, adminDeleteListing, createListings, showListings } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create-listings', createListings);
router.get('/show-listings', showListings);
router.get('/search', Search);
router.delete('/adminDeleteListing', adminDeleteListing);

export default router;