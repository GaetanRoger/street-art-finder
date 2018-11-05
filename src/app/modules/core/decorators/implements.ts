import {ObjectIDable} from '../../shared/types/object-idable';
import {defaultFindableImplement} from '../default-implements/findable';
import {defaultListableImplement} from '../default-implements/listable';
import {defaultDeletableImplement} from '../default-implements/deletable';
import {defaultCreatableImplement} from '../default-implements/creatable';
import {defaultUpdatableImplement} from '../default-implements/updatable';
import {Findable} from '../services/firestore/firestore-finder/interfaces/findable';
import {Listable} from '../services/firestore/firestore-finder/interfaces/listable';
import {Creatable} from '../services/firestore/firestore-cruder/interfaces/creatable';
import {Updatable} from '../services/firestore/firestore-cruder/interfaces/updatable';
import {Writable} from '../services/firestore/firestore-cruder/interfaces/writable';
import {Deletable} from '../services/firestore/firestore-cruder/interfaces/deletable';
import {Readable} from '../services/firestore/firestore-finder/interfaces/readable';


const implementsMap: { [key: string]: { name: string, impl: (any) => Function }[] } = {
    [Findable.name]: defaultFindableImplement,
    [Listable.name]: defaultListableImplement,
    [Creatable.name]: defaultCreatableImplement,
    [Updatable.name]: defaultUpdatableImplement,
    [Deletable.name]: defaultDeletableImplement,
    [Writable.name]: [...defaultCreatableImplement, ...defaultUpdatableImplement, ...defaultDeletableImplement],
    [Readable.name]: [...defaultFindableImplement, ...defaultListableImplement]
};

export const Implements = <T extends ObjectIDable>(interfaces: Function[], collection: string) => {
    return (target): void => {
        target.prototype.collection = collection;
        interfaces.forEach(i => inject<T>(i, target, collection));
    };
};

const inject = <T extends ObjectIDable>(interf: Function, target: any, collection: string): void => {
    const interfaceImplements = implementsMap[interf.name];

    if (interfaceImplements) {
        interfaceImplements.forEach(interfaceImplement => injectImplement(target, interfaceImplement, collection));
    } else {
        console.warn(interf.name, 'is not supported by the @Implements decorator.');
    }
};

const injectImplement = (target: any, interfaceImplement, collection: string) => {
    return target.prototype[interfaceImplement.name] = interfaceImplement.impl({collection});
};
