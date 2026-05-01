export type UserRole = 'admin' | 'team' | 'jury';

export type User = {
    id: number;
    login: string;
    email: string;
    role: UserRole;
    createdAt: string;
};

export type RegisterRequest = {
    login: string;
    password: string;
    email: string;
    role: UserRole;
};

export type RegisterResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
};

export type LoginRequest = {
    login: string;
    password: string;
};

export type LoginResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
};

export type RefreshTokenRequest = {
    refreshToken: string;
};

export type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

export type UpdateUserRequest = {
    login?: string;
    email?: string;
    password?: string;
};

export type UpdateUserResponse = {
    id: number;
    login: string;
    email: string;
    role: UserRole;
    updatedAt: string;
};

export type DeleteUserResponse = {
    success: boolean;
};