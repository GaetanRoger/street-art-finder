import {ObjectIDable} from '../../shared/types/object-idable';
import {ExtraModuleInjectorService} from '../extra-module-injector.service';
import {FirestoreFinderService} from '../services/firestore/firestore-finder/firestore-finder.service';
import {FirestoreWhere} from '../services/firestore/firestore-finder/firestore-where';

const impl = <T extends ObjectIDable>(collection: string) => {
    return (where: FirestoreWhere[]) => {
        const finder = ExtraModuleInjectorService.get<FirestoreFinderService>(FirestoreFinderService);
        return finder.findAll<T>(collection, where);
    };
};

export const defaultListableImplement = [
    {name: 'list', impl: ({collection}) => impl(collection)}
];
