import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Piece} from '../../../shared/types/piece';
import {flatMap, map, take} from 'rxjs/operators';
import {AlgoliaService} from '../algolia/algolia.service';
import {QueryParameters} from 'algoliasearch';
import {UserGeolocationService} from '../location/geolocation/user-geolocation.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {ImageResizerService} from '../image-resizer/image-resizer.service';
import {Findable} from '../firestore/firestore-finder/interfaces/findable';
import {FirestoreFinderService} from '../firestore/firestore-finder/firestore-finder.service';
import {FirestoreCruderService} from '../firestore/firestore-cruder/firestore-cruder.service';
import {FiltersBuilder} from '../algolia/filters-builder';
import {AutoImplemented} from '../../decorators/auto-implemented';
import {Implements} from '../../decorators/implements';
import {Writable} from '../firestore/firestore-cruder/interfaces/writable';

@Injectable({
    providedIn: 'root'
})
@Implements<Piece>([Findable, Writable], 'pieces')
export class PieceService implements Findable<Piece>, Writable<Piece> {
    @AutoImplemented collection: string;
    @AutoImplemented find: (id: string) => Observable<Piece>;
    @AutoImplemented create: (document: Piece) => Observable<string>;
    @AutoImplemented update: (document: Piece) => Observable<string>;
    @AutoImplemented delete: (id: string) => Observable<string>;

    constructor(private readonly algolia: AlgoliaService,
                private readonly geolocation: UserGeolocationService,
                private readonly storage: AngularFireStorage,
                private readonly resizer: ImageResizerService,
                private readonly finder: FirestoreFinderService,
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
                flatMap(param => this.algolia.query<Piece>(this.collection, param))
            );
    }

    findAllVanished(artistId: string): Observable<Piece[]> {
        return this.finder.findFrom<Piece>(this.collection)
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

    markAsVanished(pieceId: string, value: boolean = true): Observable<string> {
        return this.cruder.update(this.collection, pieceId, {['tags.vanished']: value});
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
