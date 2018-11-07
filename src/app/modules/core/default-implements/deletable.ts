import {ObjectIDable} from '../../shared/types/object-idable';
import {ExtraModuleInjectorService} from '../extra-module-injector.service';
import {FirestoreCruderService} from '../services/firestore/firestore-cruder/firestore-cruder.service';

const impl = <T extends ObjectIDable>(collection: string) => {
    return (id: string) => {
        const cruder = ExtraModuleInjectorService.get<FirestoreCruderService<{}>>(FirestoreCruderService);
        return cruder.deleteOther<T>(collection, id);
    };
};

export const defaultDeletableImplement = [
    {name: 'delete', impl: ({collection}) => impl(collection)}
];
