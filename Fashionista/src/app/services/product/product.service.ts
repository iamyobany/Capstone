import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsApi = 'http://localhost:8080/api/products';

  products;
  product;

  constructor(private httpClient: HttpClient) {
    this.products = new BehaviorSubject<Array<any>>([]);
  }
  
  // Error handling
  private static error(error: any): void {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server request error';
    console.error(message);
  }

  get(): Promise<Array<any>> {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(this.productsApi).toPromise().then(prods => {
      this.products.next(prods);
      return prods;
    }).catch(ProductService.error);
  }

  getById(id): Promise<any> {
    this.product = {_id: '', name: '', brand: ''};
    return this.httpClient.get(`${this.productsApi}/${id}`).toPromise().then(prod => prod).catch(ProductService.error);
  }

  postProduct(newProduct): Promise<any> {
    return this.httpClient.post(this.productsApi, newProduct).toPromise().then(prod => {
      this.product = prod;
      this.get();
      return prod;
    }).catch(ProductService.error);
  }

  putProduct(id, updatedProduct): Promise<any> {
    return this.httpClient.put(`${this.productsApi}/${id}`, updatedProduct).toPromise().then(prod => {
      this.product = prod;
      this.get();
      return prod;
    }).catch(ProductService.error);
  }

  deleteProduct(id): Promise<any> {
    return this.httpClient.delete(`${this.productsApi}/${id}`).toPromise().then(prodId => {
      this.get();
      return prodId;
    }).catch(ProductService.error);
  }
}
