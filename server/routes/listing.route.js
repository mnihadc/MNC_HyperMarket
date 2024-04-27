import express from 'express';
import { Search, createListings, showListings } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create-listings', createListings);
router.get('/show-listings', showListings);
router.get('/search', Search);

export default router;