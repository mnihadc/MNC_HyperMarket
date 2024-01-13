import express from 'express'
import { createAddress, deleteUser, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/create-address', verifyToken, createAddress);
router.get('/get-addresses/:id', verifyToken, getAddress);

export default router;