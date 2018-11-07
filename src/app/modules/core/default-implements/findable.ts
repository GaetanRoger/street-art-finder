import {ObjectIDable} from '../../shared/types/object-idable';
import {DefaultFindableImplement} from './default-findable-implement';

export const defaultFindableImplement = [
    {name: 'find', impl: ({collection}) => impl(collection)}
];

export const impl = <T extends ObjectIDable>(collection: string) => {
    const cls = new DefaultFindableImplement({collection});
    return cls.find;
};
