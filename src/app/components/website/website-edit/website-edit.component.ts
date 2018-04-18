import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('f') websiteEditForm: NgForm;
  user = {};
  userId: string;
  websites = [{}];
  websiteId: string;
  website = {};
  name: string;
  description: string;
  constructor(private router: Router,
              private websiteService: WebsiteService,
              private sharedService: SharedService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.user = this.sharedService.user || {};
          this.userId = this.user['userId'];
          this.websiteId = params['websiteId'];
          this.websiteService.findWebsitesByUser(this.userId)
            .subscribe(
              (websites: [{}]) => {
                this.websites = websites;
              });
          this.websiteService.findWebsiteById(this.websiteId)
            .subscribe(
              (website: {}) => {
                this.website = website;
                this.name = this.website['name'];
                this.description = this.website['description'];
              });
        });
  }

  updateWebsite() {
    this.name = this.websiteEditForm.value.name;
    this.description = this.websiteEditForm.value.description;
    this.website['name'] = this.name;
    this.website['description'] = this.description;
    this.websiteService.updateWebsite(this.websiteId, this.website)
      .subscribe(
        res => {
          this.router.navigate(['/user', this.userId, 'website']);
        },
        err => {
        }
      );
    }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId)
      .subscribe(
        res => {
          this.router.navigate(['/user', this.userId, 'website']);
        },
        err => {
        }
      );
  }
}
