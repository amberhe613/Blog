import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  user = {};
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};
  widgetType: string;

  constructor(private router: Router,
              private widgetService: WidgetService,
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
          this.widgetId = params['widgetId'];
          this.widgetService.findWidgetById(this.widgetId)
            .subscribe(
              (widget: {}) => {
                this.widget = widget;
                this.widgetType = this.widget['widgetType'];
              });
        });
  }

}
