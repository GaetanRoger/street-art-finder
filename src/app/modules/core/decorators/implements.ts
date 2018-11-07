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
import {Deletable} from '../services/firestore/firestore-cruder/interfaces/deletable';
import {Writable} from '../services/firestore/firestore-cruder/interfaces/writable';

const implementsMap = new Map<Function, { name: string, impl: (any) => Function }[]>()
    .set(Findable, defaultFindableImplement)
    .set(Listable, defaultListableImplement)
    .set(Creatable, defaultCreatableImplement)
    .set(Updatable, defaultUpdatableImplement)
    .set(Deletable, defaultDeletableImplement)
    .set(Writable, [...defaultCreatableImplement, ...defaultUpdatableImplement, ...defaultDeletableImplement]);

const injectImplement = (target: any, interfaceImplement, collection: string) => {
    return target.prototype[interfaceImplement.name] = interfaceImplement.impl({collection});
};

const inject = <T extends ObjectIDable>(interf: Function, target: any, collection: string): void => {
    const interfaceImplements = implementsMap.get(interf);

    if (interfaceImplements !== undefined) {
        interfaceImplements.forEach(interfaceImplement => injectImplement(target, interfaceImplement, collection));
    } else {
        console.warn(interf.name, 'is not supported by the @Implements decorator.');
    }
};

// tslint:disable:only-arrow-functions Arrow functions do not work for decorators.
export function Implements<T extends ObjectIDable>(interfaces: Function[], collection: string) {
    return (target): void => {
        target.prototype.collection = collection;
        interfaces.forEach(i => inject<T>(i, target, collection));
    };
}
