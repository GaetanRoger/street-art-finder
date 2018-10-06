import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from 'angularfire2/storage';
import {Artist} from '../../../core/types/artist';
import {Piece} from '../../../core/types/piece';
import {PieceService} from '../../../core/services/piece/piece.service';
import {IdGeneratorService} from '../../../core/services/id-generator/id-generator.service';
import {PieceGroup} from './piece-group';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-admin-add-piece',
    templateUrl: './admin-add-piece.component.html',
    styleUrls: ['./admin-add-piece.component.css']
})
export class AdminAddPieceComponent implements OnInit {
    pieceFormGroup: FormGroup;
    mainImage: Blob;

    constructor(private readonly fb: FormBuilder) {
    }

    get general(): FormGroup {
        return this.pieceFormGroup.get('general') as FormGroup;
    }

    ngOnInit(): void {
        this.pieceFormGroup = this.fb.group(new PieceGroup(this.fb));
    }


}
