import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm, Validators, FormControl } from '@angular/forms';

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
  errorMsg = 'Invalid username or password!';

  constructor() { }

  ngOnInit() {
    this.title = "Register";
  }

  login() {
    // fetching data from loginForm
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.validpassword = this.loginForm.value.validpassword;
  }

}
