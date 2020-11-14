import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  sub
  productid

  title = 'product-update'
  form: FormGroup
  constructor(private readonly fb:FormBuilder, private auth: AuthService, private router: Router, private ps:ProductService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    })
   }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.productid = params['id'];
    })
    console.log(this.productid)
  }

  submitUpdateForm(): void {
    if (this.form.valid){
      this.ps.putProduct(this.productid, this.form.getRawValue()).then(product => {
        if (!product) {
          console.log(product)
          console.log('Failed to update product')
        } else {
          console.log('Product Updated')
          this.router.navigate(['/admin', {trigger: 'PRODUCTUPDATED'}])
        }
      })
    }
  }

}
