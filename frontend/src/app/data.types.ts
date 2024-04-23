export interface Todo {
    _id: string;
    title: string;
    body: string;
    completedAt: Date;
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
}

export interface StandardResponse<T = unknown> {
    success: boolean,
    data: T;
}