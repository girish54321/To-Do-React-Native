export interface UserToDoResponse {
    todo: Todo;
}

export interface Todo {
    body: string;
    createdAt: Date;
    state: string;
    title: string;
    toDoId: string;
    updatedAt: Date;
    userId: string;
}
