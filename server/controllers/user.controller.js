import { handleError } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Address from "../models/address.modal.js";

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(handleError(401, "You can only update your own account"));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(handleError(401, "You can only delete your own account"));
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return next(handleError(404, "User not found"));
        }

        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};

export const createAddress = async (req, res, next) => {
    try {
        const createAddress = await Address.create(req.body);
        return res.status(201).json(createAddress);
    } catch (error) {
        next(error);
    }
};

export const getAddress = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const address = await Address.find({ userRef: req.params.id });
            res.status(200).json({ success: true, addresses: address });
        } catch (error) {
            next(error);
        }
    } else {
        return next(handleError(401, 'You can only view your own addresses!'));
    }
}

