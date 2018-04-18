import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../../services/shared.service.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @ViewChild('f') widgetEditForm: NgForm;
  user = {};
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};
  widgetType: string;
  text: string;
  size: string;

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
                this.text = this.widget['text'];
                this.size = this.widget['size'];
              });
        });
  }
  updateWidget() {
    this.widgetType = this.widgetEditForm.value.widgetType;
    this.text = this.widgetEditForm.value.text;
    this.size = this.widgetEditForm.value.size;
    this.widget['widgetType'] = this.widgetType;
    this.widget['text'] = this.text;
    this.widget['size'] = this.size;
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
