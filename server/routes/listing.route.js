import express from 'express';
import { createListings, showListings } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create-listings', createListings);
router.get('/show-listings',showListings);

export default router;