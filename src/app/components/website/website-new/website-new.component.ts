import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') newWebsiteForm: NgForm;
  userId: string;
  websites = [{}];
  name: string;
  description: string;
  constructor(private router: Router, private websiteService: WebsiteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
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
