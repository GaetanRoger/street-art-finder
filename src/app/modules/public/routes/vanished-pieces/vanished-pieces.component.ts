import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PieceService} from '../../../core/services/piece/piece.service';
import {Observable} from 'rxjs';
import {Piece} from '../../../shared/types/piece';
import {ArtistPreview} from '../../../shared/types/artist';
import {filter, map, startWith} from 'rxjs/operators';

@Component({
  selector: 'streart-vanished-pieces',
  templateUrl: './vanished-pieces.component.html',
  styleUrls: ['./vanished-pieces.component.css']
})
export class VanishedPiecesComponent implements OnInit {

  title$: Observable<string>;
  vanishedPieces$: Observable<Piece[]>;
  artist$: Observable<ArtistPreview>;

  constructor(private readonly route: ActivatedRoute,
              private readonly pieceService: PieceService) {
  }

  ngOnInit() {
    this.vanishedPieces$ = this.pieceService.findAllVanished(this.route.snapshot.params.id);
    this.artist$ = this.vanishedPieces$.pipe(
      filter(pieces => !!pieces && pieces.length > 0),
      map(pieces => pieces[0].artist)
    );
    this.title$ = this.artist$.pipe(
      map(a => a.name + ' — vanished pieces'),
      startWith('Vanished pieces')
    );
  }

}
