import {ObjectIDable} from '../../shared/types/object-idable';
import {defaultFindableImplement} from '../default-implements/findable';
import {defaultListableImplement} from '../default-implements/listable';
import {defaultDeletableImplement} from '../default-implements/deletable';
import {defaultCreatableImplement} from '../default-implements/creatable';
import {defaultUpdatableImplement} from '../default-implements/updatable';


const implementsMap: { [key: string]: { name: string, impl: (any) => Function }[] } = {
    Findable: defaultFindableImplement,
    Listable: defaultListableImplement,
    Creatable: defaultCreatableImplement,
    Updatable: defaultUpdatableImplement,
    Deletable: defaultDeletableImplement
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
