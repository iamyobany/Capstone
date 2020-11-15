import { Router } from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() userId = '';
  @Input() userEmail = '';
  @Input() userType = '';
  @Input() loggedInUserType = '';

  constructor(private us: UserService, private router: Router) {

  }

  ngOnInit(): void {

  }

  editUser(): boolean | void {
    this.router.navigate([`/updateUser/${this.userId}`])
  }

  deleteUser(): boolean | void {
    this.us.deleteUser(this.userId);
  }

  unimplemented(direct: boolean = true): void {
    if (direct) {
      throw new Error('function not specified');
    } else {
      throw new Error('unimplemented');
    }
  }
}
