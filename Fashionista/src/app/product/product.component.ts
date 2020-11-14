import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user/users.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() productId;
  @Input() productName;
  @Input() productBrand;
  @Input() cartCount;
  @Input() displayType = ''; // display 'all', 'cart', or 'wishlist'
  @Input() userType = '';
  @Input() parent = '';

  parents = {
    admin: ['admin-portal'],
    user: ['user-portal'],
  };

  constructor(private auth: AuthService, private ps: ProductService, private us: UserService) { }

  ngOnInit(): void {
    if (this.productId && (!this.productName || !this.productBrand)) {
        this.ps.getById(this.productId).then(product => {
          this.productName = product.name;
          this.productBrand = product.brand;
        });
    }
  }

  addToCart(): boolean {
    const success = this.auth.loggedIn;
    if (success) {
      this.us.postCart(this.auth.user._id, this.productId);
    }
    return success;
  }

  removeFromCart(): boolean {
    const success = this.auth.loggedIn;
    if (success) {
      this.us.deleteCart(this.auth.user._id, this.productId);
    }
    return success;
  }

  moveToWishlist(): boolean {
    let success = this.auth.loggedIn;
    if (success) {
      success &&= this.addToWishlist() && this.removeFromCart();
    }
    return success;
  }

  addToWishlist(): boolean {
    const success = this.auth.loggedIn;
    if (success) {
      this.us.postWishlist(this.auth.user._id, this.productId);
    }
    return success;
  }

  removeFromWishlist(): boolean {
    const success = this.auth.loggedIn;
    if (success) {
      this.us.deleteWishlist(this.auth.user._id, this.productId);
    }
    return success;
  }

  moveToCart(): boolean {
    let success = this.auth.loggedIn;
    if (success) {
      success &&= this.addToCart() && this.removeFromWishlist();
    }
    return success;
  }

  editProduct(): boolean | void {
    // TODO: edit product server request and ui
    this.unimplemented(false);
  }

  deleteProduct(): boolean | void {
    this.ps.deleteProduct(this.productId);
  }

  // Non-Existant function handling
  unimplemented(direct: boolean = true): void {
    if (direct) {
      throw new Error('function not specified');
    } else {
      throw new Error('unimplemented');
    }
  }

}
