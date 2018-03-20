import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
// injecting service into module
@Injectable()
export class WidgetService {
  constructor() { }
  widgets = [
      {_id: '123', widgetType: 'HEADING', pageId: '321', size: 2, text: 'GIZMODO'},
      {_id: '234', widgetType: 'HEADING', pageId: '321', size: 4, text: 'Lorem ipsum'},
      {_id: '345', widgetType: 'IMAGE', pageId: '321', width: '100%',
          url: 'http://images.beyazgazete.com/haber/2012/10/5/20121005_ofiste-basarinin-anahtari-yavru-kedi-resimleri.jpg'},
      {_id: '456', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'},
      {_id: '567', widgetType: 'HEADING', pageId: '321', size: 4, text: 'Lorem ipsum'},
      {_id: '678', widgetType: 'YOUTUBE', pageId: '321', width: '100%', url: 'https://www.youtube.com/embed/aqHhpahguVY'},
      {_id: '789', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'},
      {_id: '123', widgetType: 'HEADING', pageId: '234', size: 2, text: 'GIZMODO'},
      {_id: '234', widgetType: 'HEADING', pageId: '234', size: 4, text: 'Lorem ipsum'},
      {_id: '345', widgetType: 'IMAGE', pageId: '234', width: '100%',
          url: 'http://images.beyazgazete.com/haber/2012/10/5/20121005_ofiste-basarinin-anahtari-yavru-kedi-resimleri.jpg'},
      {_id: '456', widgetType: 'HTML', pageId: '234', text: '<p>Lorem ipsum</p>'},
      {_id: '567', widgetType: 'HEADING', pageId: '234', size: 4, text: 'Lorem ipsum'},
      {_id: '678', widgetType: 'YOUTUBE', pageId: '234', width: '100%', url: 'https://www.youtube.com/embed/aqHhpahguVY'},
      {_id: '789', widgetType: 'HTML', pageId: '234', text: '<p>Lorem ipsum</p>'}
  ];
  api = {
    'createWidget' : this.createWidget,
    'findWidgetsByPageId' : this.findWidgetsByPageId,
    'findWidgetById' : this.findWidgetById,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };

  createWidget(pageId: string, widget: any) {
    widget._id = (String(Date.now()) + Math.floor(Math.random() * 10000)).slice(-3);
    widget.pageId = pageId;
    this.widgets.push(widget);
    return widget;
  }

  findWidgetsByPageId(pageId: string) {
    const widgetsList = [];
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId !== pageId) {
        widgetsList.push(this.widgets[x]);
      }
    }
    return widgetsList;
  }

  findWidgetById(widgetId: string) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        return this.widgets[x];
      }
    }
  }

  updateWidget(widgetId: string, widget: any) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        this.widgets[x] = widget;
        return this.widgets[x];
      }
    }
  }

  deleteWidget(widgetId: string) {
      this.widgets = this.widgets.filter(function(el) {
          return el._id !== widgetId;
      });
      return this.widgets;
  }
}

// Implement the following API in the WidgetService service
// 1. createWidget(pageId, widget) - adds the widget parameter instance to the local widgets array. The new
// widget's pageId is set to the pageId parameter
// 2. findWidgetsByPageId(pageId) - retrieves the widgets in local widgets array whose pageId matches the
// parameter pageId
// 3. findWidgetById(widgetId) - retrieves the widget in local widgets array whose _id matches the widgetId
// parameter
// 4. updateWidget(widgetId, widget) - updates the widget in local widgets array whose _id matches the
// widgetId parameter
// 5. deleteWidget(widgetId) - removes the widget from local widgets array whose _id matches the widgetId
// parameter
