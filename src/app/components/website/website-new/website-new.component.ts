import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') newWebsiteForm: NgForm;
  user = {};
  userId: string;
  websites = [{}];
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
          this.websiteService.findWebsitesByUser(this.userId)
            .subscribe(
              (websites: [{}]) => {
                this.websites = websites;
              });
        });
  }
  createNewWebsite() {
    this.name = this.newWebsiteForm.value.name;
    this.description = this.newWebsiteForm.value.desc;
    const newWebsite = {};
    newWebsite['name'] = this.name;
    newWebsite['description'] = this.description;
    this.websiteService.createWebsite(this.userId, newWebsite)
      .subscribe(
      res => {
        this.router.navigate(['/user', this.userId, 'website']);
      },
      err => {

      }
    );
  }
}
