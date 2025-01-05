import { File } from './userToDoResponse';

export interface LoginRes {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
}

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
}


export interface ErrorRes {
    error: {
        message: string;
        status: number;
    };
}

export interface UserProfileResponse {
    users?: ProfileUsers;
}

export interface ProfileUsers {
    userId?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: null;
    files?: File[];
}
