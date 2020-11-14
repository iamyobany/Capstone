import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'login';

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
      this.auth.login(this.form.getRawValue()).then(status => {
        if (!status) {
          this.failedLogin = true;
        } else {
          this.us.getUserById(this.auth.user._id).then(() => this.router.navigate([`/${this.auth.user.type}`, {trigger: 'SIGN_IN'}]));
        }
      });
    }
  }

  routeToRegistration(): void {
    this.router.navigate(['/register', {trigger: 'SIGN_IN'}]);
  }
}
