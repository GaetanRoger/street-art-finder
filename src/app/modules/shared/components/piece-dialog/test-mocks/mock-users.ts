import {User} from '../../../types/user';

const baseUser: Partial<User> = {
    objectID: 'userid',
    settings: {locationApproximation: 0},
    lastLoginAt: '0',
    emailVerified: false,
    createdAt: '0',
    email: 'user@user.com'
};

export const mockStandardUser: User = {
    ...baseUser,
    roles: {user: true},
} as User;

export const mockAdminUser: User = {
    ...baseUser,
    roles: {user: true, admin: true}
} as User;