import { ProductService } from '../services/product/product.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  title = 'product-create'
  form: FormGroup
  constructor(private readonly fb:FormBuilder, private auth: AuthService, private router: Router, private ps:ProductService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      quantity: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  submitCreationForm(): void {
    if (this.form.valid){
      this.ps.postProduct(this.form.getRawValue()).then(product => {
        if (!product) {
          console.log(product)
          console.log('Failed to create product')
        } else {
          console.log('Created Product')
          this.router.navigate(['/admin', {trigger: 'PRODUCTCREATED'}])
        }
      })
    }
  }

}
