import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  @ViewChild('f') widgetEditForm: NgForm;
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};
  widgetType: string;
  url: string;
  width: string;

  constructor(private router: Router, private widgetService: WidgetService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteId = params['websiteId'];
          this.pageId = params['pageId'];
          this.widgetId = params['widgetId'];
          this.widget = this.widgetService.findWidgetById(this.widgetId);
          this.widgetType = this.widget['widgetType'];
          this.url = this.widget['url'];
          this.width = this.widget['width'];
        });
  }
  updateWidget() {
    this.widgetType = this.widgetEditForm.value.widgetType;
    this.url = this.widgetEditForm.value.url;
    this.width = this.widgetEditForm.value.width;
    this.widget['widgetType'] = this.widgetType;
    this.widget['url'] = this.url;
    this.widget['width'] = this.width;
    if (this.widgetService.updateWidget(this.widgetId, this.widget)) {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
  }
}
