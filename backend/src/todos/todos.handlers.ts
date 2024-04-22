import { RequestHandler } from "express";
import { StandardResponse } from "../helpers/types";
import { Todo } from "./todos.model";
import { WorkspaceModel } from "../workspaces/workspaces.model";

export const getTodos: RequestHandler<{ workspaceId: string }, StandardResponse<any>, unknown, { page: number; }> = async (req, res, next) => {
    try {
        const pageSize = 10;
        const page = req.query.page || 1;
        const workspaceId = req.params.workspaceId;

        const results = await WorkspaceModel.findOne(
            { _id: workspaceId },
            { _id: 0, todos: 1 }
        )
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        next(error);
    }
}

export const getTodoById: RequestHandler<{ workspaceId: string, todoId: string }, StandardResponse<any>> = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const todoId = req.params.todoId;
        const todo = await WorkspaceModel.findOne(
            { _id: workspaceId, 'todos._id': todoId },
            { _id: 0, 'todos.$': 1 }
        );
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

export const putTodoById: RequestHandler<{ workspaceId: string, todoId: string }, StandardResponse<number>, Todo> = async (req, res, next) => {
    try {
        const { workspaceId, todoId } = req.params;
        const updateTodo = req.body;
        const userId = req.token._id;

        const results = await WorkspaceModel.updateOne(
            { _id: workspaceId, 'todos._id': todoId },
            { $set: { "todos.$": updateTodo } }
        );

        res.status(200).json({ success: true, data: results.modifiedCount });

    } catch (error) {
        next(error);
    }
}

export const deleteTodoById: RequestHandler<{ workspaceId: string, todoId: string }, StandardResponse<number>> = async (req, res, next) => {
    try {
        const { workspaceId, todoId } = req.params;
        const userId = req.token._id;

        const results = await WorkspaceModel.updateOne(
            { 
                _id: workspaceId,
                $or: [
                    { owner_id: userId },
                    { members: { $elemMatch: { user_id: userId } } }
                ]
            },
            { $pull: { todos: { _id: todoId } } }
        );

        res.status(200).json({ success: true, data: results.modifiedCount });

    } catch (error) {
        next(error);
    }
}

export const markComplete: RequestHandler<{ workspaceId: string, todoId: string }, StandardResponse<number>, Todo> = async (req, res, next) => {
    try {
        const { workspaceId, todoId } = req.params;
        const userId = req.token._id;

        const created = await WorkspaceModel.updateOne(
            {
                _id: workspaceId, 
                $or: [
                    { owner_id: userId },
                    { members: { $elemMatch: { user_id: userId } } }
                ],
                'todos._id': todoId
            },
            {
                $set: { 'todos.$.completedAt': new Date() }
            }
        );

        console.log(created)

        res.status(200).json({ success: true, data: created.modifiedCount });
    } catch (error) {
        next(error);
    }
}

export const markIncomplete: RequestHandler<{ workspaceId: string, todoId: string }, StandardResponse<number>, Todo> = async (req, res, next) => {
    try {
        const { workspaceId, todoId } = req.params;
        const userId = req.token._id;

        const created = await WorkspaceModel.updateOne(
            {
                _id: workspaceId, 
                $or: [
                    { owner_id: userId },
                    { members: { $elemMatch: { user_id: userId } } }
                ],
                'todos._id': todoId
            },
            {
                $set: { 'todos.$.completedAt': null }
            }
        );

        console.log(created)

        res.status(200).json({ success: true, data: created.modifiedCount });
    } catch (error) {
        next(error);
    }
}