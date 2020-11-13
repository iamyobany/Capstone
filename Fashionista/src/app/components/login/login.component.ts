import { UserService } from './../../services/user/user.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  failedLogin;

  constructor(private readonly fb: FormBuilder, private auth: AuthService, private router: Router, private us: UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.failedLogin = false;
  }

  ngOnInit(): void {
  }

  submitLoginForm(): void {
    if (this.form.valid) {
      // console.log(this.form.getRawValue());
      this.auth.login(this.form.getRawValue()).then(status => {
        if (!status) {
          console.log(status);
          // console.log('Failed login.');
          this.failedLogin = true;
        } else {
          // console.log('Successful login.');
          this.us.getUserById(this.auth.user._id).then(() => this.router.navigate([`/${this.auth.user.type}`, {trigger: 'SIGN_IN'}]));

        }
      });
    }

  }

}
