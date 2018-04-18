import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../services/widget.service.client';
import {SharedService} from '../../../../services/shared.service.client';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  @ViewChild('f') widgetEditForm: NgForm;
  user = {};
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};
  widgetType: string;
  url: string;
  width: string;

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
                this.url = this.widget['url'];
                this.width = this.widget['width'];
              });
        });
  }
  updateWidget() {
    this.widgetType = this.widgetEditForm.value.widgetType;
    this.url = this.widgetEditForm.value.url;
    this.width = this.widgetEditForm.value.width;
    this.widget['widgetType'] = this.widgetType;
    this.widget['url'] = this.url;
    this.widget['width'] = this.width;
    this.widgetService.updateWidget(this.widgetId, this.widget)
      .subscribe(
        res => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        },
        err => {
        });
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe(
        res => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        },
        err => {
        });
  }
}
