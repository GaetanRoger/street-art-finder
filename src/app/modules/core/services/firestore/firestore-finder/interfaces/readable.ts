import {Findable} from './findable';
import {Listable} from './listable';
import {ObjectIDable} from '../../../../../shared/types/object-idable';

// @ts-ignore Can be ignored because no implementation in parents classes.
export abstract class Readable<T extends ObjectIDable> extends Findable<T>, Listable<T> {
}
