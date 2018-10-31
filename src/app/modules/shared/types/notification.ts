import {ObjectIDable} from './object-idable';

export interface Notification extends ObjectIDable {
    user: string;
    title: string;
    text: string;
    link?: {
        href: string;
        text: string;
    };
    routerLink?: {
        href: string;
        text: string;
    };
    date: number;
    read: boolean;
    icon?: string;
}
