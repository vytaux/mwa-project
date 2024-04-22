import express, { json } from 'express';
import { postTodo, getTodos, getTodoById, putTodoById, deleteTodoById, markComplete, markIncomplete } from './todos.handlers';

const todosRouter = express.Router({mergeParams: true});

todosRouter.get('/', getTodos);
todosRouter.post('/', json(), postTodo);
todosRouter.get('/:todoId', getTodoById);
todosRouter.put('/:todoId', json(), putTodoById);
todosRouter.delete('/:todoId', deleteTodoById);

todosRouter.post('/:todoId/mark-complete', json(), markComplete);
todosRouter.post('/:todoId/mark-incomplete', json(), markIncomplete);

export default todosRouter;