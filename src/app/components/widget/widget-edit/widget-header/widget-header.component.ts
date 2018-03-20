import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @ViewChild('f') widgetEditForm: NgForm;
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};
  widgetType: string;
  text: string;
  size: string;

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
          this.text = this.widget['text'];
          this.size = this.widget['size'];
        });
  }
  updateWidget() {
    this.widgetType = this.widgetEditForm.value.widgetType;
    this.text = this.widgetEditForm.value.text;
    this.size = this.widgetEditForm.value.size;
    this.widget['widgetType'] = this.widgetType;
    this.widget['text'] = this.text;
    this.widget['size'] = this.size;
    if (this.widgetService.updateWidget(this.widgetId, this.widget)) {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
  }
}
