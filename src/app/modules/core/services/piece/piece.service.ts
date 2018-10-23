import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Piece} from '../../types/piece';
import {AngularFirestore} from '@angular/fire/firestore';
import {flatMap, map, take} from 'rxjs/operators';
import {ObjectIDInjectorService} from '../objectid-injecter/object-i-d-injector.service';
import {AlgoliaService} from '../algolia/algolia.service';
import {QueryParameters} from 'algoliasearch';
import {UserGeolocationService} from '../geolocation/user-geolocation.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {ImageResizerService} from '../image-resizer/image-resizer.service';

@Injectable({
    providedIn: 'root'
})
export class PieceService {
    readonly COLLECTION = 'pieces';

    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjectorService<Piece>,
                private readonly algolia: AlgoliaService,
                private readonly geolocation: UserGeolocationService,
                private readonly storage: AngularFireStorage,
                private readonly resizer: ImageResizerService) {
    }

    findAll(artistId: string, query: string = '', page: number = 0, hitsPerPage: number = 10): Observable<Piece[]> {
        const filters = artistId ? `artist.objectID:${artistId}` : '';

        const baseParameters: QueryParameters = {
            query,
            filters,
            page,
            hitsPerPage,
        };

        return this.geolocation.currentGeolocation()
            .pipe(
                take(1),
                map(loc => {
                    return loc
                        ? {...baseParameters, aroundLatLng: `${loc.latitude}, ${loc.longitude}`}
                        : baseParameters;
                }),
                flatMap(param => this.algolia.query<Piece>(this.COLLECTION, param))
            );
    }

    findAllVanished(artistId: string): Observable<Piece[]> {
        return this.firestore
            .collection<Piece>(this.COLLECTION, ref => {
                return ref
                    .where('artist.objectID', '==', artistId)
                    .where('tags.vanished', '==', true);
            })
            .snapshotChanges()
            .pipe(
                map(snap => this.objectIDInjecter.injectIntoCollection(snap))
            );
    }

    findAllAndSubscribe(query: string): Observable<Piece[]> {
        return this.findAll('', query)
            .pipe(
                flatMap(pieces => this._combinePiecesFromFirestore(pieces)),
            );
    }

    find(pieceId: string): Observable<Piece> {
        return this.firestore
            .doc<Piece>(`${this.COLLECTION}/${pieceId}`)
            .snapshotChanges()
            .pipe(
                map(snap => this.objectIDInjecter.injectIntoDoc(snap))
            );
    }

    create(piece: Piece) {
        const id = piece.objectID;
        delete piece.objectID;

        return this.firestore.doc(`${this.COLLECTION}/${id}`)
            .set({
                ...piece
            });
    }

    markAsVanished(pieceId: string, value: boolean = true): Promise<void> {
        return this.firestore.collection(this.COLLECTION)
            .doc(pieceId)
            .update({['tags.vanished']: value});
    }

    delete(pieceId: string): Promise<void> {
        return this.firestore.collection(this.COLLECTION)
            .doc(pieceId)
            .delete();
    }

    uploadImage(image: Blob, imageName: string, artistId: string, pieceId: string, prefix: string = ''): AngularFireUploadTask {
        const name = prefix
            ? `${prefix}@${imageName}`
            : imageName;

        const basePath = `/artists/${artistId}/pieces/${pieceId}/`;
        const pathNormal = `${basePath}${name}`;
        return this.storage.upload(pathNormal, image);
    }

    async uploadImages(image: Blob, imageName: string, artistId: string, pieceId: string): Promise<{ low: AngularFireUploadTask; normal: AngularFireUploadTask }> {
        const resized = await this.resizer.resize(image, imageName, 500, 500);

        const uploadLow = this.uploadImage(
            resized,
            imageName,
            artistId,
            pieceId,
            'low'
        );

        const uploadNormal = this.uploadImage(
            image,
            imageName,
            artistId,
            pieceId,
            'normal'
        );

        return {
            low: uploadLow,
            normal: uploadNormal
        };
    }

    private _combinePiecesFromFirestore(pieces): Observable<Piece[]> {
        return combineLatest(pieces.map(p => this.find(p.objectID)))
            .pipe(
                map(p => p.filter((pp: Piece) => pp && pp.name)), // We check the piece exists
            ) as Observable<Piece[]>;
    }
}
