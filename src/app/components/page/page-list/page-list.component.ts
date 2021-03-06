import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  userId: string;
  websiteId: string;
  pages = [{}];
  constructor(private router: Router, private pageService: PageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteId = params['websiteId'];
          this.pageService.findPageByWebsiteId(this.websiteId)
            .subscribe(
              (pages: [{}]) => {
                this.pages = pages;
              });
        });
  }
}
