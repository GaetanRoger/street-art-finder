import {ObjectIDable} from '../../../../../shared/types/object-idable';
import {Creatable} from './creatable';
import {Updatable} from './updatable';
import {Deletable} from './deletable';

// @ts-ignore Can be ignored because no implementation in parents classes.
export abstract class Writable<T extends ObjectIDable> extends Creatable<T>, Updatable<T>, Deletable<T> {
}
