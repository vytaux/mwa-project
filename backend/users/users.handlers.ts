import { RequestHandler } from "express";
import { ErrorWithStatus, StandardResponse } from "../helpers/types";
import { User, UserModel } from "./users.model";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export const loginHandler: RequestHandler<unknown, StandardResponse<string>, { email: string, password: string }> = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new ErrorWithStatus('User not found', 401);
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new ErrorWithStatus('Invalid password', 401);
        }

        if (!process.env.PRIVATE_KEY) {
            throw new ErrorWithStatus('Private key not found', 404);
        }

        const jwt = sign({
            _id: user._id,
            email: user.email
        }, process.env.PRIVATE_KEY)

        res.status(200).json({ success: true, data: jwt });
    
    } catch (error) {
        next(error);
    }
}

export const registerHandler: RequestHandler<unknown, StandardResponse<boolean>, User> = async (req, res, next) => {
    try {
        const newUser = req.body;
        const hashedPassword = await hash(newUser.password, 10);
        const results = await UserModel.create({
            ...newUser,
            password: hashedPassword
        });

        res.status(200).json({ success: true, data: true });
    } catch (error) {
        next(error);
    }
}