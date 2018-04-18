import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  @ViewChild('f') editPageForm: NgForm;
  user = {};
  userId: string;
  websiteId: string;
  pageId: string;
  page = {};
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
          this.pageId = params['pageId'];
          this.pageService.findPageById(this.pageId)
            .subscribe(
              (page: {}) => {
                this.page = page;
                this.pageName = this.page['name'];
                this.pageTitle = this.page['title'];
              });
        });
  }
  editPage() {
    this.pageName = this.editPageForm.value.pageName;
    this.pageTitle = this.editPageForm.value.pageTitle;
    this.page['name'] = this.pageName;
    this.page['title'] = this.pageTitle;
    this.pageService.updatePage(this.pageId, this.page)
      .subscribe(
        res => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
        },
        err => {
        }
      );
  }

  deletePage() {
    this.pageService.deletePage(this.pageId)      .subscribe(
      res => {
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
      },
      err => {
      }
    );
  }
}
