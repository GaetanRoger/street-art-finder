import {FirestoreWhereOperator} from './firestore-where-operator';

export interface FirestoreWhere {
    field: string;
    operator: FirestoreWhereOperator;
    value: any;
}
