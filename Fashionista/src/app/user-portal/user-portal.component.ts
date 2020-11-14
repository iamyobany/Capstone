import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ProductService} from '../services/product/product.service';
import { UserService } from '../services/user/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {

  title = 'user-portal';

  userType = '';
  productList = [];
  cartList = [];
  wishList = [];


  constructor(private auth: AuthService, private ps: ProductService, private us: UserService, private router: Router) {
    this.us.user.subscribe(user => {
      this.userType = user.type;
    });

    this.ps.products.subscribe(products => this.productList = products);
    this.us.cart.subscribe(cart => {
      const nextCart = [];
      if (cart && cart.length) {
        cart.forEach(slimProduct => this.ps.getById(slimProduct._id).then(({_id, name, brand}) => nextCart.push({_id, name, brand, count: slimProduct.count})));
      }
      this.cartList = nextCart;
    });
    this.us.wishlist.subscribe(wishlist => {
      const nextWishlist = [];
      if (wishlist) {
        wishlist.forEach(slimProduct => this.ps.getById(slimProduct._id).then(product => nextWishlist.push(product)));
      }
      this.wishList = nextWishlist;
    });
  }

  ngOnInit(): void {
    this.us.getUserById(this.auth.user._id);
    this.ps.get();
  }

  logout(): void {
    this.auth.logout();
    this.us.getUserById('');
    this.router.navigate(['/login', {trigger: 'SIGN_OUT'}]);
  }

}
