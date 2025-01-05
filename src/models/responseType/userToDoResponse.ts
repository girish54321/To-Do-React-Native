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
    files?: File[];
}

export interface File {
    fileId?: string;
    fileName?: string;
    fileSize?: string;
    type?: string;
    createdAt?: Date;
    updatedAt?: Date;
    toDoId?: string;
    userId?: string;
}
