import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../../../services/user.service.client';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';

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

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.user = this.userService.findUserById(this.userId);
          this.username = this.user['username'];
          this.firstName = this.user['firstName'];
          this.lastName = this.user['lastName'];
        });
  }
  update() {
      this.username = this.profileForm.value.username;
      this.firstName = this.profileForm.value.firstName;
      this.lastName = this.profileForm.value.lastName;
      this.user['username'] = this.username;
      this.user['firstName'] = this.firstName;
      this.user['lastName'] = this.lastName;
      if (this.userService.updateUser(this.userId, this.user)) {
        this.router.navigate(['/user', this.userId]);
    }
  }
}
