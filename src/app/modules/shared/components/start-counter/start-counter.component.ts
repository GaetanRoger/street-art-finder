import {Component, Input} from '@angular/core';

@Component({
  selector: 'streart-start-counter',
  templateUrl: './start-counter.component.html',
  styleUrls: ['./start-counter.component.scss']
})
export class StartCounterComponent {
  @Input() value: number | string;
  @Input() title: string;
}
