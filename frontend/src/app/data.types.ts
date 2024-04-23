import { JwtPayload } from "jwt-decode";

export interface Todo {
    _id: string;
    title: string;
    body: string;
    completedAt: Date | null;
}

export interface Member {
    _id: string;
    email: string;
}

export interface Workspace {
    _id: string;
    name: string;
    todos: Todo[];
    members: Member[];
    isDefault: boolean;
    owner_id: string;
}

export interface StandardResponse<T = unknown> {
    success: boolean,
    data: T;
}