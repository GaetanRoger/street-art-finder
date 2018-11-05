import {ObjectIDable} from '../../shared/types/object-idable';
import {ExtraModuleInjectorService} from '../extra-module-injector.service';
import {FirestoreFinderService} from '../services/firestore/firestore-finder/firestore-finder.service';

export const defaultFindableImplement = [
    {name: 'find', impl: ({collection}) => impl(collection)}
];

const impl = <T extends ObjectIDable>(collection: string) => {
    return (id: string) => {
        const finder = ExtraModuleInjectorService.get<FirestoreFinderService>(FirestoreFinderService);
        return finder.find<T>(collection, id);
    };
};