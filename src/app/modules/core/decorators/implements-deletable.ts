import {ObjectIDable} from '../../shared/types/object-idable';
import {ExtraModuleInjectorService} from '../extra-module-injector.service';
import {FirestoreCruderService} from '../services/firestore/firestore-cruder/firestore-cruder.service';

export const ImplementsDeletable = <T extends ObjectIDable>(collection: string) => {
    return (target) => {
        injectDelete<T>(target, collection);
    };
};

const injectDelete = <T extends ObjectIDable>(target: any, collection: string): void => {
    const cruder = ExtraModuleInjectorService.get<FirestoreCruderService>(FirestoreCruderService);

    target.prototype.delete = (id: string) => cruder.deleteOther<T>(collection, id);
};
