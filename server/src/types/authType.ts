import { Request } from "express";

interface User {
    id: string;
    username: string;
    email: string;
    role: 'CANDIDATE' | 'ORGANISATION';
    firstName: string;
    lastName: string;
    phone?: string;
    organization?: string;
    emailVerified?: Date;
    image?: string;
    isResumeUploaded: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface resetToken {
    id: string;
    userId: string;
    token: string;
    expireAt: Date;
    isUsed: Boolean;
    createdAt: Date;
}

export interface AuthRequest extends Request {
    user: User;
    resetToken?: resetToken; 
}

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    organization?: string;
}

export interface SigninRequest {
    email: string;
    password: string;
}