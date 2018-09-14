export interface UserPreview {
    uid: string;
    email: string;
}

export interface User extends UserPreview {
    emailVerified: boolean;
    lastLoginAt: string;
    createdAt: string;
    locationApproximation?: number;
}
