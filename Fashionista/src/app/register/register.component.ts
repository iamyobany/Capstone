import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  failedRegistration;
  userType;
  loggedInUserType;
  title = 'register-user';

  constructor(private readonly fb: FormBuilder, private auth: AuthService, private router: Router, private us: UserService) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.failedRegistration = false;
    this.userType = 'user';
    if (!this.loggedInUserType) {
      this.loggedInUserType = this.auth.user.type || '';
    }
  }

  ngOnInit(): void {
  }

  submitRegisterForm(): void {
    if (this.form.valid) {
      const registerFormVal = this.form.getRawValue();
      registerFormVal.type = this.userType;
      this.us.postUser(registerFormVal).then(user => {
        if (!user) {
          console.log(user);
          this.failedRegistration = true;
        } else {
          this.router.navigate(['/login', {trigger: 'REGISTER'}]);
        }
      });
    }
  }

  routeToLogin(): void {
    this.router.navigate(['/login', {trigger: 'REGISTER'}]);
  }

}
