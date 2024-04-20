import { RequestHandler } from "express";
import { StandardResponse } from "../helpers/types";
import { Todo, TodoModel } from "./todos.model";

export const getTodos: RequestHandler<unknown, StandardResponse<Todo[]>, unknown, { page: number; }> = async (req, res, next) => {
    try {
        const pageSize = 10;
        const page = req.query.page || 1;

        const results = await TodoModel.find({})
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        next(error);
    }
}

export const getTodoById: RequestHandler<{ todoId: string }, StandardResponse<Todo | null>> = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const todo = await TodoModel.findOne({ _id: todoId });
        res.status(200).json({ success: true, data: todo });
    } catch (error) {
        next(error);
    }
}

export const postTodo: RequestHandler<unknown, StandardResponse<string>, Todo> = async (req, res, next) => {
    try {
        const newTodo = req.body;
        const { _id, email } = req.token;
        const created = await TodoModel.create({
            ...newTodo,
            created_by: { user_id: _id, email }
        });
        res.status(200).json({ success: true, data: created._id.toString() });

    } catch (error) {
        next(error);
    }
}

export const putTodoById: RequestHandler<{ todoId: string }, StandardResponse<number>, Todo> = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const updateTodo = req.body;
        const { _id: userId } = req.token;

        const results = await TodoModel.updateOne(
            { _id: todoId, 'created_by.user_id': userId },
            { $set: updateTodo }
        );

        res.status(200).json({ success: true, data: results.modifiedCount });

    } catch (error) {
        next(error);
    }
}

export const deleteTodoById: RequestHandler<{ todoId: string }, StandardResponse<number>> = async (req, res, next) => {
    try {
        const todoId = req.params.todoId;
        const { _id } = req.token;

        const results = await TodoModel.deleteOne({
            _id: todoId,
            'created_by.user_id': _id 
        });

        res.status(200).json({ success: true, data: results.deletedCount });

    } catch (error) {
        next(error);
    }
}