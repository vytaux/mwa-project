import { RequestHandler } from "express";
import { StandardResponse } from "../helpers/types";
import { Workspace, WorkspaceModel } from "../workspaces/workspaces.model";
import { UserModel } from "../users/users.model";

export const getWorkspaces: RequestHandler<unknown, StandardResponse<Workspace[]>, unknown, { page: number; }> = async (req, res, next) => {
    try {
        const pageSize = 10;
        const page = req.query.page || 1;
        const userId = req.token._id;

        // User can access workspaces they own or are members of
        const results = await WorkspaceModel.find(
            {
                $or: [
                    { owner_id: userId },
                    { members: { $elemMatch: { user_id: userId } } }
                ]
            },
            { _id: 1, name: 1, todos: 1, members: 1, owner_id: 1, isDefault: 1})
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        next(error);
    }
}

export const getWorkspaceById: RequestHandler<{ workspaceId: string }, StandardResponse<Workspace | null>> = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.token._id;

        // User can access workspaces they own or are members of
        const workspace = await WorkspaceModel.findOne({
            _id: workspaceId,
            $or: [
                { owner_id: userId },
                { members: { $elemMatch: { user_id: userId } } }
            ]
        });

        res.status(200).json({ success: true, data: workspace });
    } catch (error) {
        next(error);
    }
}

export const postWorkspace: RequestHandler<unknown, StandardResponse<string>, Workspace> = async (req, res, next) => {
    try {
        const newWorkspace = req.body;
        const _id = req.token._id;

        const created = await WorkspaceModel.create({
            ...newWorkspace,
            owner_id: _id,
        });

        res.status(200).json({ success: true, data: created._id.toString() });
    } catch (error) {
        next(error);
    }
}

export const putWorkspaceById: RequestHandler<{ workspaceId: string }, StandardResponse<number>, Workspace> = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const updateWorkspace = req.body;
        const userId = req.token._id;

        // User can only update workspaces they own
        const results = await WorkspaceModel.updateOne(
            { _id: workspaceId, owner_id: userId },
            { $set: updateWorkspace }
        );

        res.status(200).json({ success: true, data: results.modifiedCount });
    } catch (error) {
        next(error);
    }
}

export const deleteWorkspaceById: RequestHandler<{ workspaceId: string }, StandardResponse<number>> = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.token._id;

        // User can only delete workspaces they own
        const results = await WorkspaceModel.deleteOne({
            _id: workspaceId, owner_id: userId
        });

        res.status(200).json({ success: true, data: results.deletedCount });

    } catch (error) {
        next(error);
    }
}

export const addMemberToWorkspace: RequestHandler<{ workspaceId: string }, StandardResponse<number>, { user_id: string, email: string }> = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.token._id;
        const email = req.body.email;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const memberAdded = await WorkspaceModel.updateOne(
            { _id: workspaceId, 'owner_id': userId },
            { $addToSet: { members: { user_id: user._id, email } } }
        );

        if (memberAdded.modifiedCount < 1) {
            throw new Error("Error while adding member");
        }

        res.status(200).json({ success: true, data: memberAdded.modifiedCount });
    } catch (error) {
        next(error);
    }
}

export const removeMemberFromWorkspace: RequestHandler<{ workspaceId: string }, StandardResponse<number>, { user_id: string, email: string }> = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.token._id;
        const { user_id, email } = req.body;

        const memberAdded = await WorkspaceModel.updateOne(
            { _id: workspaceId, 'owner_id': userId },
            { $pull: { members: { user_id: user_id } } }
        );

        if (memberAdded.modifiedCount < 1) {
            throw new Error("Error while removing member");
        }

        res.status(200).json({ success: true, data: memberAdded.modifiedCount });
    } catch (error) {
        next(error);
    }
}