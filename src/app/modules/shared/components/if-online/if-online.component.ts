import {Component, Input, OnInit} from '@angular/core';
import {OnlineService} from '../../../core/services/online/online.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'streat-if-online',
  templateUrl: './if-online.component.html',
  styleUrls: ['./if-online.component.css']
})
export class IfOnlineComponent implements OnInit {
  @Input() offlineTitle = 'You are offline';
  @Input() offlineText = 'Sorry, the feature is only available online';

  online$: Observable<boolean>;

  constructor(private readonly onlineService: OnlineService) { }

  ngOnInit() {
    this.online$ = this.onlineService.onlineChanges;
  }

}
