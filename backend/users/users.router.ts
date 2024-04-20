import express, { json } from 'express';
import { loginHandler, registerHandler } from './users.handlers';

const usersRouter = express.Router();

usersRouter.post('/login', json(), loginHandler);
usersRouter.post('/register', json(), registerHandler);

export default usersRouter;