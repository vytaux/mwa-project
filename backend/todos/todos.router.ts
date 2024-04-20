import express, { json } from 'express';
import { postTodo, getTodos, getTodoById, putTodoById, deleteTodoById } from './todos.handlers';

const todosRouter = express.Router();

todosRouter.get('/', getTodos);
todosRouter.post('/', json(), postTodo);
todosRouter.get('/:todoId', getTodoById);
todosRouter.put('/:todoId', json(), putTodoById);
todosRouter.delete('/:todoId', deleteTodoById);

export default todosRouter;