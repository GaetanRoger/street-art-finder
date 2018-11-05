import {ObjectIDable} from '../../shared/types/object-idable';
import {ExtraModuleInjectorService} from '../extra-module-injector.service';
import {FirestoreCruderService} from '../services/firestore/firestore-cruder/firestore-cruder.service';

export const defaultCreatableImplement = [
    {name: 'create', impl: ({collection}) => impl(collection)}
];

const impl = <T extends ObjectIDable>(collection: string) => {
    return (doc: T) => {
        const cruder = ExtraModuleInjectorService.get<FirestoreCruderService<{}>>(FirestoreCruderService);
        return cruder.createOther<T>(collection, doc);
    };
};