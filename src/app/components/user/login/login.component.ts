import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  title: string;
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password!';

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.title = 'Login';
  }

  login() {
    // fetching data from loginForm
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userService.findUserByCredentials(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.errorFlag = false;
          this.router.navigate(['/user', data._id]); },
        (error: any) => {
          this.errorFlag = true;
        }
      );
  }
}
