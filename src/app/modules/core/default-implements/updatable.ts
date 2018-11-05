import {ObjectIDable} from '../../shared/types/object-idable';
import {ExtraModuleInjectorService} from '../extra-module-injector.service';
import {FirestoreCruderService} from '../services/firestore/firestore-cruder/firestore-cruder.service';

export const defaultUpdatableImplement = [
    {name: 'update', impl: ({collection}) => impl(collection)}
];

const impl = <T extends ObjectIDable>(collection: string) => {
    return (doc: T) => {
        const cruder = ExtraModuleInjectorService.get<FirestoreCruderService<{}>>(FirestoreCruderService);
        const id = doc.objectID;
        delete doc.objectID;
        return cruder.updateOther<T>(collection, id, doc);
    };
};