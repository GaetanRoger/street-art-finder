import {ObjectIDable} from './object-idable';

export interface UserPreview extends ObjectIDable{
    email: string;
}

export interface User extends UserPreview {
    emailVerified: boolean;
    lastLoginAt: string;
    createdAt: string;
    locationApproximation?: number;
}
