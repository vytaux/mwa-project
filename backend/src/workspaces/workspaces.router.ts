import express, { json } from 'express';
import { postWorkspace, getWorkspaces, getWorkspaceById, putWorkspaceById, deleteWorkspaceById, addMemberToWorkspace, removeMemberFromWorkspace } from './workspaces.handlers';
import todosRouter from "../todos/todos.router";

const workspacesRouter = express.Router();

workspacesRouter.get('/', getWorkspaces);
workspacesRouter.post('/', json(), postWorkspace);
workspacesRouter.get('/:workspaceId', getWorkspaceById);
workspacesRouter.put('/:workspaceId', json(), putWorkspaceById);
workspacesRouter.delete('/:workspaceId', deleteWorkspaceById);

workspacesRouter.post('/:workspaceId/addMember', json(), addMemberToWorkspace);
workspacesRouter.post('/:workspaceId/removeMember', json(), removeMemberFromWorkspace);

workspacesRouter.use('/:workspaceId/todos', todosRouter);

export default workspacesRouter;