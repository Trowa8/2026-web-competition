export interface LoginRequestDto {
    username: string;
    password: string;
}

export interface LoginResponseDto {
    access_token: string;
    token_type: string;
}