export type User = {
    id: string | number;
    login: string;
    email: string;
    role: string;
};

export type UserType = User;

export type LoginRequest = {
    login: string;
    password: string;
};

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
};

export type LoginResponse = AuthResponse;
export type RegisterResponse = AuthResponse;

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

export type RefreshTokenRequest = { refreshToken: string };
export type RefreshTokenResponse = { accessToken: string; refreshToken: string };
export type UpdateUserRequest = { username?: string; login?: string; email?: string };
export type UpdateUserResponse = { user: User };
export type DeleteUserResponse = { message: string };