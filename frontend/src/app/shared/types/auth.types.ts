export type UserType = {
    userId: string;
    login: string;
    email: string;
    createdAt: string;
};

export type UserDetailType = {
    userId: string;
    login: string;
    email: string;
    updatedAt: string;
};

export type RegisterRequest = {
    login: string;
    password: string;
    email: string;
};

export type RegisterResponse = {
    accessToken: string;
    refreshToken: string;
    userId: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    userId: string;
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
    login: string;
    email: string;
    password?: string;
};

export type UpdateUserResponse = {
    userId: string;
    login: string;
    email: string;
    updatedAt: string;
};

export type DeleteUserResponse = {
    success: boolean;
};
