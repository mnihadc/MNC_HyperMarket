import express from 'express';
import { signIn, signUp, google, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/google', google);
router.get('/signout',signOut);

export default router;