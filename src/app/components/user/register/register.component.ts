import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm, Validators, FormControl } from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service.client';
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

  constructor(private userService: UserService, private sharedService: SharedService,
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
      this.userService
        .register(this.username, this.password)
        .subscribe((user) => {
          this.sharedService.user = user;
          this.router.navigate(['/user', user._id]);
        });
    }
  }

}
