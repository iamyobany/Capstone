import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user/users.service';
import {ProductService} from '../services/product/product.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  title = 'admin-portal';

  productList = [];
  userList = [];

  constructor(private auth: AuthService, private router: Router, private us: UserService, private ps: ProductService) {
    this.us.users.subscribe(users => this.userList = users);
    this.ps.products.subscribe(products => this.productList = products);
  }

  ngOnInit(): void {
    this.us.getUsers();
    this.ps.get();
  }

  logout(): void {
    this.auth.logout();
    this.us.getUserById('');
    this.router.navigate(['/login', {trigger: 'SIGN_OUT'}]);
  }

}
