import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {Observable} from 'rxjs';
import {Artist} from '../../../core/types/artist';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    artists: Observable<Artist[]>;

    constructor(private readonly artistService: ArtistService) {
    }

    ngOnInit() {
        this.artists = this.artistService.findAll();
    }

}
