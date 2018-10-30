import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Piece} from '../../../shared/types/piece';
import {flatMap, map, take} from 'rxjs/operators';
import {AlgoliaService} from '../algolia/algolia.service';
import {QueryParameters} from 'algoliasearch';
import {UserGeolocationService} from '../location/geolocation/user-geolocation.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {ImageResizerService} from '../image-resizer/image-resizer.service';
import {Findable} from '../firestore/firestore-finder/findable';
import {FirestoreFinderService} from '../firestore/firestore-finder/firestore-finder.service';
import {FirestoreWhere} from '../firestore/firestore-finder/firestore-where';
import {FirestoreCruderService} from '../firestore/firestore-cruder/firestore-cruder.service';
import {FiltersBuilder} from '../algolia/filters-builder';

@Injectable({
    providedIn: 'root'
})
export class PieceService implements Findable<Piece> {
    readonly COLLECTION = 'pieces';

    constructor(private readonly algolia: AlgoliaService,
                private readonly geolocation: UserGeolocationService,
                private readonly storage: AngularFireStorage,
                private readonly resizer: ImageResizerService,
                private readonly finder: FirestoreFinderService<Piece>,
                private readonly cruder: FirestoreCruderService<Piece>) {
    }

    search(artistId: string, query: string = '', page: number = 0, hitsPerPage: number = 10): Observable<Piece[]> {
        const filters = new FiltersBuilder('artist.objectID', artistId, !!artistId).build();

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
        return this.finder.findFrom(this.COLLECTION)
            .where('artist.objectID', '==', artistId)
            .where('tags.vanished', '==', true)
            .run();
    }

    findAllAndSubscribe(query: string): Observable<Piece[]> {
        return this.search('', query)
            .pipe(
                flatMap(pieces => this._combinePiecesFromFirestore(pieces)),
            );
    }

    find(pieceId: string): Observable<Piece> {
        return this.finder.find(this.COLLECTION, pieceId);
    }

    findAll(where: FirestoreWhere[]): Observable<Piece[]> {
        return this.finder.findAll(this.COLLECTION, where);
    }

    create(piece: Piece): Observable<string> {
        return this.cruder.create(this.COLLECTION, piece);
    }

    markAsVanished(pieceId: string, value: boolean = true): Observable<string> {
        return this.cruder.update(this.COLLECTION, pieceId, {['tags.vanished']: value});
    }

    delete(pieceId: string): Observable<string> {
        return this.cruder.delete(this.COLLECTION, pieceId);
    }

    uploadImage(image: Blob, imageName: string, artistId: string, pieceId: string, prefix: string = ''): AngularFireUploadTask {
        const name = prefix
            ? `${prefix}@${imageName}`
            : imageName;

        const basePath = `/artists/${artistId}/pieces/${pieceId}/`;
        const pathNormal = `${basePath}${name}`;
        return this.storage.upload(pathNormal, image);
    }

    async uploadImages(
        image: Blob,
        imageName: string,
        artistId: string,
        pieceId: string
    ): Promise<{ low: AngularFireUploadTask; normal: AngularFireUploadTask }> {
        const resized = await this.resizer.resize(image, imageName, 500, 500);

        const uploadLow = this.uploadImage(resized, imageName, artistId, pieceId, 'low');
        const uploadNormal = this.uploadImage(image, imageName, artistId, pieceId, 'normal');

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
