import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopping-portal-example';

  constructor(private auth: AuthService, private us: UserService) {
  }

  ngOnInit(): void {
    let userId;
    userId = '5fac649719180e9934dba333';
    userId = '5fac6c5883408e2854af7a1c';

    setInterval(() => {}, 2000);

    setTimeout(() => {}, 2000);
  }

}
