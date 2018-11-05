import {ObjectIDable} from '../../shared/types/object-idable';
import {ExtraModuleInjectorService} from '../extra-module-injector.service';
import {FirestoreFinderService} from '../services/firestore/firestore-finder/firestore-finder.service';
import {FirestoreWhere} from '../services/firestore/firestore-finder/firestore-where';

export const ImplementsFindable = <T extends ObjectIDable>(collection: string) => {
    return (target) => {
        injectCollection(target, collection);
        injectFind<T>(target, collection);
        injectFindAll<T>(target, collection);
    };
};

const injectCollection = (target, collection: string): void => {
    target.prototype.collection = collection;
};

const injectFind = <T extends ObjectIDable>(target: any, collection: string): void => {
    const finder = ExtraModuleInjectorService.get<FirestoreFinderService>(FirestoreFinderService);

    target.prototype.find = (id: string) => finder.find<T>(collection, id);
};

const injectFindAll = <T extends ObjectIDable>(target: any, collection: string): void => {
    const finder = ExtraModuleInjectorService.get<FirestoreFinderService>(FirestoreFinderService);

    target.prototype.findAll = (where: FirestoreWhere[]) => finder.findAll<T>(collection, where);
};
