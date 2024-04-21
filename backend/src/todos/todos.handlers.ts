import { RequestHandler } from "express";
import { StandardResponse } from "../helpers/types";
import { Todo, TodoModel } from "./todos.model";
import { WorkspaceModel } from "../workspaces/workspaces.model";

export const getTodos: RequestHandler<{ workspaceId: string }, StandardResponse<any>, unknown, { page: number; }> = async (req, res, next) => {
    try {
        const pageSize = 10;
        const page = req.query.page || 1;
        const userId = req.token._id;
        const workspaceId = req.params.workspaceId;

        const results = await WorkspaceModel.findOne(
            {
                _id: workspaceId,
                $or: [
                    { owner_id: userId },
                    { members: { $elemMatch: { user_id: userId } } }
                ]
            },
            { _id: 0, members: 1 }
        )
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        next(error);
    }
}

export const getTodoById: RequestHandler<{ workspaceId: string, todoId: string }, StandardResponse<Todo | null>> = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const todoId = req.params.todoId;
        const todo = await TodoModel.findOne({ _id: todoId });
        res.status(200).json({ success: true, data: todo });
    } catch (error) {
        next(error);
    }
}

export const postTodo: RequestHandler<{ workspaceId: string }, StandardResponse<number>, Todo> = async (req, res, next) => {
    try {
        const newTodo = req.body;
        const { _id, email } = req.token;
        const workspaceId = req.params.workspaceId;
        const userId = req.token._id;

        const created = await WorkspaceModel.updateOne(
            {
                _id: workspaceId,
                $or: [
                    { owner_id: userId },
                    { members: { $elemMatch: { user_id: userId } } }
                ]
            },
            {
                $push: {
                    todos: {
                        ...newTodo,
                        created_by: { user_id: _id, email }
                    }
                }
            }
        );

        if (created.modifiedCount < 1) {
            throw new Error("Error while adding todo");
        }

        res.status(200).json({ success: true, data: created.modifiedCount });
    } catch (error) {
        next(error);
    }
}

export const putTodoById: RequestHandler<{ todoId: string }, StandardResponse<number>, Todo> = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const updateTodo = req.body;
        const userId = req.token._id;

        // User can only update their own todos
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
        const userId = req.token._id;

        // User can only delete their own todos
        const results = await TodoModel.deleteOne({
            _id: todoId,
            'created_by.user_id': userId
        });

        res.status(200).json({ success: true, data: results.deletedCount });

    } catch (error) {
        next(error);
    }
}