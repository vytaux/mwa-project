export interface Todo {
    id: number;
    title: string;
    body: string;
}

export interface Workspace {
    id: number;
    name: string;
    tasks: Todo[];
}