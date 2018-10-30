import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'streat-full-screen-message',
  templateUrl: './full-screen-message.component.html',
  styleUrls: ['./full-screen-message.component.css']
})
export class FullScreenMessageComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() actionText: string;
  @Output() action: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
