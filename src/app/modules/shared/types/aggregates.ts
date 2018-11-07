import {ObjectIDable} from './object-idable';

export interface Aggregates extends ObjectIDable{
    usersCount: number;
    piecesCount: number;
    artistsCount: number;
}
