import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service.client';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../../services/shared.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') profileForm: NgForm;

  userId: string;
  user = {};
  username: string;
  firstName: string;
  lastName: string;

  constructor(private router: Router,
              private userService: UserService,
              private sharedService: SharedService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.user = this.sharedService.user || {};
        this.userId = this.user['_id'];
        this.username = this.user['username'];
        this.firstName = this.user['firstName'];
        this.lastName = this.user['lastName'];
      });
  }
  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  update() {
      this.username = this.profileForm.value.username;
      this.firstName = this.profileForm.value.firstName;
      this.lastName = this.profileForm.value.lastName;
      this.user['username'] = this.username;
      this.user['firstName'] = this.firstName;
      this.user['lastName'] = this.lastName;
    this.userService.updateUser(this.userId, this.user)
      .subscribe(
        res => {
          this.router.navigate(['/user', this.userId]);
        },
        err => {

        }
      );
  }
}
