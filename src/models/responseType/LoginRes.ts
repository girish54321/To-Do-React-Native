
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
