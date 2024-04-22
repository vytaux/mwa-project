export interface Todo {
    _id: string;
    title: string;
    body: string;
}

export interface Workspace {
    _id: string;
    name: string;
    todos: Todo[];
}

export interface StandardResponse<T = unknown> {
    success: boolean,
    data: T;
}