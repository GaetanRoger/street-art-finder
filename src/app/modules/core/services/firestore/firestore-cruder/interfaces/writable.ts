import {ObjectIDable} from '../../../../../shared/types/object-idable';
import {Creatable} from './creatable';
import {Updatable} from './updatable';
import {Deletable} from './deletable';

// @ts-ignore
export abstract class Writable<T extends ObjectIDable> extends Creatable<T>, Updatable<T>, Deletable<T>{
}
