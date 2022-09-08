export interface DecodedTokenFields {
    email: string;
    iat: number;
    exp: number;
}

export interface IUser {
    userId: number;
    email: string;
    fullName: string;
    password: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
}
