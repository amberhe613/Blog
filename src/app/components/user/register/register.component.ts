import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm, Validators, FormControl } from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;

  title: string;
  username: string;
  password: string;
  validPassword: string;
  errorFlag: boolean;
  errorMsg = 'Two passwords are different!';

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.title = 'Register';
  }

    register() {
    // fetching data from loginForm
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.validPassword = this.registerForm.value.validPassword;
    if (this.password === this.validPassword) {
      const user = {};
      user['username'] = this.username;
      user['password'] = this.password;
      this.userService.createUser(user)
        .subscribe(
          res => {
            this.errorFlag = false;
            this.router.navigate(['/user', res.json()]);
          },
          err => {
            this.errorFlag = true;
          }
        );
    } else {
        this.errorFlag = true;
    }
  }
}
