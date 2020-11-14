import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  constructor(private auth: AuthService, private us: UserService, private router: Router) {
    this.us.user.subscribe(({firstName, lastName, type}) => {
      this.userName = `${firstName} ${lastName}`;
      this.userType = type;
    });
    if (!this.loggedInUserType) {
      this.loggedInUserType = this.auth.user.type || '';
    }
  }

  parents = {
    admin: ['admin-portal'],
    user: ['user-portal'],
    logout: ['admin-portal', 'user-portal'],

  };

  @Input() userName = '';
  @Input() userType = '';
  @Input() parent = '';

  loggedInUserType = '';

  cart = '';

  ngOnInit(): void {
    if (!this.userName || !this.userType) {
      const {firstName, lastName, type} = this.auth.user;
      this.userName = `${firstName} ${lastName}`;
      this.userType = type;
    }
  }

  purchase(): void {
    this.us.getCart(this.auth.user._id).then(_cart => {
      if (_cart.length) {
        this.us.putUser(this.auth.user._id, {cart: []}).then(() => this.us.getCart(this.auth.user._id));
        return _cart;
      }
    }).then(_cart => alert(`Successfully purchased ${_cart.length} unique item${_cart.length === 1 ? '' : 's'} in cart!`)).catch(() => alert('No items in cart!'));

  }

  logout(): void {
    this.auth.logout();
    this.us.getUserById('');
    this.router.navigate(['/login', {trigger: 'SIGN_OUT'}]);
  }

  routeToUserPortal(): void {
    this.router.navigate(['/user', {trigger: 'ADMIN_PORTAL'}]);
  }

  routeToAdminPortal(): void {
    this.router.navigate(['/admin', {trigger: 'USER_PORTAL'}]);
  }

  routeToRegistration(): void {
    this.router.navigate(['/register', {trigger: this.parent.toUpperCase()}]);
  }

  //Double check if this is required
  unimplemented(direct: boolean = true): void {
    if (direct) {
      throw new Error('function not specified');
    } else {
      throw new Error('unimplemented');
    }
  }

}
