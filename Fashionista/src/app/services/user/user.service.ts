import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersApi = 'http://localhost:8080/api/users';
  private cartsApi = 'http://localhost:8080/api/carts';
  private wishlistsApi = 'http://localhost:8080/api/wishlist';

  user;
  users;
  cart;
  wishlist;

  constructor(private httpClient: HttpClient) {
    this.user = new Subject<any>();
    this.users = new Subject<Array<any>>();
    this.cart = new BehaviorSubject<Array<any>>([]);
    this.wishlist = new BehaviorSubject<Array<any>>([]);

    this.user.subscribe(_user => {
      this.cart.next(_user.cart);
    });
    this.user.subscribe(_user => this.wishlist.next(_user.wishlist));
  }

  // Error handling
  private static error(error: any): void {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server request error';
    console.error(message);
  }

  getUsers(): Promise<any> {
    // @ts-ignore
    // tslint:disable-next-line:variable-name max-line-length
    return this.httpClient.get(this.usersApi).toPromise().then(_users => {
      this.users.next(_users);
      return _users;
    }).catch(UserService.error);
  }

  getUserById(id): Promise<any> {
    if (!id) {
      this.user.next({});
      return new Promise<any>(((resolve, reject) => (resolve({}))));
    }

    return this.httpClient.get(`${this.usersApi}/${id}`).toPromise().then(_user => {
      this.user.next(_user);
      console.log(_user);
      return _user;
    }).catch(UserService.error);
  }

  postUser(user): Promise<any> {
    // tslint:disable-next-line:variable-name
    return this.httpClient.post(`${this.usersApi}`, user).toPromise().then(_user => {
      this.getUsers();
      return _user;
    }).catch(UserService.error);
  }

  putUser(id, user): Promise<any> {
    // tslint:disable-next-line:variable-name
    return this.httpClient.put(`${this.usersApi}/${id}`, user).toPromise().then(_user => {
      this.getUsers();
      return _user;
    }).catch(UserService.error);
  }

  deleteUser(id): Promise<any> {
    // tslint:disable-next-line:variable-name
    return this.httpClient.delete(`${this.usersApi}/${id}`).toPromise().then(_user => {
      this.getUsers();
      return _user;
    }).catch(UserService.error);
  }

  getCart(id): Promise<Array<any>> {
    // tslint:disable-next-line:variable-name
    return this.httpClient.get(`${this.usersApi}/${id}`).toPromise().then((_user: any) => {
      this.cart.next(_user.cart);
      return _user.cart;
    }).catch(UserService.error);
  }

  postCart(userId, productId): Promise<Array<any>> {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length variable-name
    return this.httpClient.post(`${this.cartsApi}/${userId}/${productId}`).toPromise().then(_cart => {
      this.cart.next(_cart);
      return _cart;
    });
  }

  putCart(userId, productId): void {
    // TODO: implement put cart request and ui (if needed)
    this.unimplemented(false);
  }

  deleteCart(userId, productId): Promise<Array<any>> {
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    return this.httpClient.delete(`${this.cartsApi}/${userId}/${productId}`).toPromise().then(_cart => {
      this.cart.next(_cart);
      return _cart;
    }).catch(UserService.error);
  }

  getWishlist(id): Promise<Array<any>> {
    // tslint:disable-next-line:variable-name
    return this.httpClient.get(`${this.usersApi}/${id}`).toPromise().then((_user: any) => {
      this.wishlist.next(_user.wishlist);
      return _user.wishlist;
    }).catch(UserService.error);
  }

  postWishlist(userId, productId): void {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length variable-name
    return this.httpClient.post(`${this.wishlistsApi}/${userId}/${productId}`).toPromise().then(_wishlist => {
      this.wishlist.next(_wishlist);
      return _wishlist;
    }).catch(UserService.error);
  }

  deleteWishlist(userId, productId): void {
    // throw new Error('unimplemented');
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    return this.httpClient.delete(`${this.wishlistsApi}/${userId}/${productId}`).toPromise().then(_wishlist => {
      this.wishlist.next(_wishlist);
      return _wishlist;
    }).catch(UserService.error);
  }

  unimplemented(direct: boolean = true): void {
    if (direct) {
      throw new Error('function not specified');
    } else {
      throw new Error('unimplemented');
    }
  }
}
