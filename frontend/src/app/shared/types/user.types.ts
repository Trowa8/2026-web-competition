export type User = {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
    createdAt?: Date;
    updatedAt?: Date;
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
};

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
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

export type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
};