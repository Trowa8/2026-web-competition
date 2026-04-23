export type User = {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    user: User;
    token: string;
};