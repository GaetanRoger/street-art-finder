export interface UserPreview {
    uid: string;
    email: string;
}

export interface UserMetadata {
    creationTime: Date;
    lastSignInTime: Date;
}

export interface User extends UserPreview {
    emailVerified: boolean;
    metadata: UserMetadata;
}
