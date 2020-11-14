import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  private KEY = 'fashionista-auth';
  private TYPE_KEY = 'fashionista-auth-type';
  private EMAIL_KEY = 'fashionista-auth-email';
  private FIRSTNAME_KEY = 'fashionista-auth-firstName';
  private LASTNAME_KEY = 'fashionista-auth-lastName';

  private TTL = 1000 * 60 * 10;
  private authApi = 'http://localhost:8080/api/login';

  private currentUser = {};
  private loggedInStatus = false;

  get user(): any {
    // tslint:disable-next-line:variable-email
    const _id = this.getWithExpiry(this.KEY);
    const type = this.getWithExpiry(this.TYPE_KEY);
    const email = this.getWithExpiry(this.EMAIL_KEY);
    const firstName = this.getWithExpiry(this.FIRSTNAME_KEY);
    const lastName = this.getWithExpiry(this.LASTNAME_KEY);

    return (_id && type && email && firstName && lastName) ? {_id, firstName, lastName, email, type} : {};
  }

  get loggedIn(): boolean {
    return !!this.getWithExpiry(this.KEY);
  }

  // Error handling
  private static error(error: any): void {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Auth server error';
    console.error(message);
  }

  private static setWithExpiry(key, value, ttl): void {
    const now = new Date();

    //contain original value along with expire time
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  private static remove(key): boolean {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return false;
    }
    localStorage.removeItem(key);

    return true;
  }

  login(user): Promise<boolean> {
    const {email, password} = user;
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => reject('No response.'), 10000);
      if (email && password) {
        resolve(this.authUser({email, password}));
      } else {
        resolve(false);
      }
    });
  }

  authUser(user): Promise<boolean> {
    const {email, password} = user;
    // @ts-ignore
    return this.httpClient.post(this.authApi, {email, password}).toPromise().then(({_id, firstName, lastName, type, error}) => {
      if (error) {
        console.log(error);
        return false;
      } else {
        this.currentUser = {_id, email: user.email, firstName, lastName, type};
        AuthService.remove(this.KEY);
        AuthService.setWithExpiry(this.KEY, _id, this.TTL);
        AuthService.remove(this.TYPE_KEY);
        AuthService.setWithExpiry(this.TYPE_KEY, type, this.TTL);
        AuthService.remove(this.EMAIL_KEY);
        AuthService.setWithExpiry(this.EMAIL_KEY, email, this.TTL);
        AuthService.remove(this.FIRSTNAME_KEY);
        AuthService.setWithExpiry(this.FIRSTNAME_KEY, firstName, this.TTL);
        AuthService.remove(this.LASTNAME_KEY);
        AuthService.setWithExpiry(this.LASTNAME_KEY, lastName, this.TTL);
        return true;
      }
    }).catch(AuthService.error);
  }

  logout(): void {
    AuthService.remove(this.KEY);
    AuthService.remove(this.TYPE_KEY);
    AuthService.remove(this.EMAIL_KEY);
    AuthService.remove(this.FIRSTNAME_KEY);
    AuthService.remove(this.LASTNAME_KEY);
    this.currentUser = {};
    this.loggedInStatus = false;
  }

  private getWithExpiry(key): number {
    const itemStr = localStorage.getItem(key);

    // If item doesn't exist then return null
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    localStorage.removeItem(key);

    // Compare expire time to current time
    if (now.getTime() > item.expiry) {
      //If expired then delete item from storage and return null
      return null;
    } else {
      AuthService.setWithExpiry(key, item.value, this.TTL);
    }
    return item.value;
  }

}
