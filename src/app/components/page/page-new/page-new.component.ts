import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  @ViewChild('f') newPageForm: NgForm;
  user = {};
  userId: string;
  websiteId: string;
  pages = [{}];
  pageName: string;
  pageTitle: string;

  constructor(private router: Router,
              private pageService: PageService,
              private sharedService: SharedService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.user = this.sharedService.user || {};
          this.userId = this.user['userId'];
          this.websiteId = params['websiteId'];
          this.pageService.findPageByWebsiteId(this.websiteId)
            .subscribe(
              (pages: [{}]) => {
                this.pages = pages;
              });
        });
  }

  createNewPage() {
    this.pageName = this.newPageForm.value.name;
    this.pageTitle = this.newPageForm.value.title;
    const newPage = {};
    newPage['name'] = this.pageName;
    newPage['title'] = this.pageTitle;
    this.pageService.createPage(this.websiteId, newPage)

      .subscribe(
        res => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
        },
        err => {

        }
      );
    }
}
