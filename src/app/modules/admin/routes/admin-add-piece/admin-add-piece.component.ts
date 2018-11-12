import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PieceGroup} from './piece-group';
import {ActivatedRoute} from '@angular/router';
import {PieceService} from '../../../core/services/piece/piece.service';
import {Piece} from '../../../shared/types/piece';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {combineLatest, of, Subscription} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {Artist} from '../../../shared/types/artist';
import {Geopoint} from '../../../shared/types/geopoint';

@Component({
    selector: 'streat-admin-add-piece',
    templateUrl: './admin-add-piece.component.html',
    styleUrls: ['./admin-add-piece.component.css']
})
export class AdminAddPieceComponent implements OnInit, OnDestroy {
    pieceFormGroup: FormGroup;
    mainImage: { blob: Blob; name: string };
    editing: boolean;
    uploadImages = true;
    editingPieceId: string;
    private _pieceFindSubscription: Subscription;

    constructor(private readonly fb: FormBuilder,
                private readonly route: ActivatedRoute,
                private readonly pieceService: PieceService,
                private readonly artistService: ArtistService) {
    }

    get general(): FormGroup {
        return this.pieceFormGroup.get('general') as FormGroup;
    }

    get location(): Geopoint {
        return this.general.get('location').value;
    }

    ngOnInit(): void {
        this.pieceFormGroup = this.fb.group(new PieceGroup());
        this.editingPieceId = this.route.snapshot.params.pieceId;

        if (this.editingPieceId) {
            this.editing = true;
            this.pieceFormGroup.disable();
            this._pieceFindSubscription = this.pieceService.find(this.editingPieceId)
                .pipe(flatMap(p => combineLatest(of(p), this.artistService.find(p.artist.objectID))))
                .subscribe(([p, a]) => this._populateForm(p, a));
        } else {
            this.editing = false;
        }
    }

    ngOnDestroy(): void {
        this._pieceFindSubscription.unsubscribe();
    }

    setLocation(location: Geopoint): void {
        this.general.get('location').setValue(location);
    }

    private _populateForm(p: Piece, a: Artist) {
        const general = this.pieceFormGroup.get('general') as FormGroup;
        general.get('name').setValue(p.name);
        general.get('text').setValue(p.text);
        general.get('vanished').setValue(p.tags.vanished);
        general.get('accessible').setValue(p.tags.accessible);
        general.get('location').get('latitude').setValue(p.location.latitude);
        general.get('location').get('longitude').setValue(p.location.longitude);
        general.get('artist').setValue(a);

        this.pieceFormGroup.enable();
    }
}
