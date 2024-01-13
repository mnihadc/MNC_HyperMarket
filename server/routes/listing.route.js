import express from 'express';
import { createListings } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create-listings', createListings);

export default router;