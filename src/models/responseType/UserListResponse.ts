export interface UserToDOS {
    total_pages?: number;
    total?: number;
    per_page?: number;
    page?: number;
    todo?: Todo[];
}

export interface Todo {
    toDoId?: string;
    title?: string;
    body?: string;
    state?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
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
