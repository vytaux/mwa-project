declare namespace Express {
    interface Request {
        token: {
            _id: string,
            email: string;
        };
    }
}