import { RequestHandler } from 'express';
import { ErrorWithStatus, Token } from '../helpers/types';
import { verify } from 'jsonwebtoken';

export const verifyToken: RequestHandler<unknown, unknown, unknown, unknown> = (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            throw new ErrorWithStatus('JWT is required', 400);
        }

        const jwt = authorization.split(' ')[1];
        if (!jwt) {
            throw new ErrorWithStatus('Malformed JWT', 400);
        }

        if (!process.env.PRIVATE_KEY) {
            throw new ErrorWithStatus('Private key not found', 400);
        }
        
        const jwtData = verify(jwt, process.env.PRIVATE_KEY) as Token; 
        req.token = jwtData

        next();
    } catch (error) {
        next(error);
    }
}