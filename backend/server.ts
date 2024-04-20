import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import { dbConnect } from './helpers/db.connect';
import { errorHandler, noRouteHandler } from './helpers/handlers';
import usersRouter from './users/users.router';
import todosRouter from './src/todos/todos.router';
import { verifyToken } from './users/users.middleware';

const app = express();
dbConnect();

app.use(morgan('dev'));


app.use('/api/v1', usersRouter);
app.use('/api/v1/todos', verifyToken, todosRouter);

app.all('*', noRouteHandler);
app.use(errorHandler);

app.listen(3000);