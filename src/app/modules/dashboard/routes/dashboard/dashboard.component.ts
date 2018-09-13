import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$: Observable<any>;

  constructor(private readonly userService: UserService) { }

  ngOnInit() {
    this.user$ = this.userService.user();
  }

}
