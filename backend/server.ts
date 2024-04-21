import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import helmet from "helmet";
import 'dotenv/config';
import { dbConnect } from './src/helpers/db.connect';
import { errorHandler, noRouteHandler } from './src/helpers/handlers';
import usersRouter from './src/users/users.router';
import todosRouter from './src/todos/todos.router';
import { verifyToken } from './src/users/users.middleware';
import workspacesRouter from './src/workspaces/workspaces.router';

const app = express();
dbConnect();

app.use(morgan('dev'));
app.use(cors());
// app.use(helmet());


app.use('/api/v1', usersRouter);
// app.use('/api/v1/todos', verifyToken, todosRouter);
app.use('/api/v1/workspaces', verifyToken, workspacesRouter);

app.all('*', noRouteHandler);
app.use(errorHandler);

app.listen(3000);