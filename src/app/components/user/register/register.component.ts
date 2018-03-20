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
  @ViewChild('f') loginForm: NgForm;

  title: string;
  username: string;
  password: string;
  validpassword: string;
  errorFlag: boolean;
  errorMsg = 'Two passwords are different!';

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.title = "Register";
  }

    register() {
    // fetching data from loginForm
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.validpassword = this.loginForm.value.validpassword;
    if (this.password === this.validpassword) {
      const user = {};
      user['username'] = this.username;
      user['password'] = this.password;
      const newUser = this.userService.createUser(user);
      this.router.navigate(['/user/', newUser._id]);
    } else {
        this.errorFlag = true;
    }
  }
}
