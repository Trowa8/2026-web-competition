export type User = {
    id: number;
    login: string;
    email: string;
    role: string;
    createdAt: string;
};

export type LoginRequest = {
    login: string;
    password: string;
};

export type LoginResponse = {
    user: User;
    token: string;
};