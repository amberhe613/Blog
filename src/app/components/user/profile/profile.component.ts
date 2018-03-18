import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service.client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;
  user = {};
  username: string;
  firstname: string;
  lastname: string;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
        }
      );
    this.user = this.userService.api.findUserById(this.userId);
    this.username = this.user['username'];
    this.firstname = this.user['firstName'];
    this.lastname = this.user['lastName'];
  }

}
