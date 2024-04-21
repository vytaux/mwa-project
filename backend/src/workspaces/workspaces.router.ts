import express, { json } from 'express';
import { postWorkspace, getWorkspaces, getWorkspaceById, putWorkspaceById, deleteWorkspaceById } from './workspaces.handlers';

const workspacesRouter = express.Router();

workspacesRouter.get('/', getWorkspaces);
workspacesRouter.post('/', json(), postWorkspace);
workspacesRouter.get('/:workspaceId', getWorkspaceById);
workspacesRouter.put('/:workspaceId', json(), putWorkspaceById);
workspacesRouter.delete('/:workspaceId', deleteWorkspaceById);

export default workspacesRouter;