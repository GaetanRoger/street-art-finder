import {Component, Input} from '@angular/core';

@Component({
  selector: 'streart-star-counter',
  templateUrl: './star-counter.component.html',
  styleUrls: ['./star-counter.component.scss']
})
export class StarCounterComponent {
  @Input() value: number | string;
  @Input() title: string;
}
