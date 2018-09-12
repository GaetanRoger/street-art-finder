import {ObjectIDable} from './object-idable';

export interface UserPreview extends ObjectIDable {
    name: string;
}

export interface User extends UserPreview {
    email: string;
}
