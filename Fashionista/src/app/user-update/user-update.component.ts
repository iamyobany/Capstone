import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  sub
  userid

  title = 'product-update'
  form: FormGroup
  constructor(private readonly fb:FormBuilder, private auth: AuthService, private router: Router, private us:UserService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
   }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.userid = params['id'];
    })
  }

  submitUpdateForm(): void {
    if (this.form.valid){
      this.us.putUser(this.userid, this.form.getRawValue()).then(user => {
        if (!user) {
          console.log(user)
          console.log('Failed to update user')
        } else {
          console.log('User Updated')
          this.router.navigate(['/admin', {trigger: 'USERUPDATED'}])
        }
      })
    }
  }


}
