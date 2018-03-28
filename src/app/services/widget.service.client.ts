import {HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
// injecting service into module
import { Http, Response, HttpModule, Headers } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WidgetService {
  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;

  createWidget(pageId: string, widget: any) {
    return this._http.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget)
      .pipe(function (response) {
        return response;
      });
  }

  findWidgetsByPageId(pageId: string) {
    return this._http.get(this.baseUrl + '/api/page/' + pageId + '/widget')
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findWidgetById(widgetId: string) {
      return this._http.get(this.baseUrl + '/api/widget/' + widgetId)
        .map(
          (res: Response) => {
            const data = res.json();
            return data;
          }
        );
    }

  updateWidget(widgetId: string, widget: any) {
      return this._http.put(this.baseUrl + '/api/widget/' + widgetId, widget)
        .pipe(function (response) {
          return response;
        });
  }

  deleteWidget(widgetId: string) {
      return this._http.delete(this.baseUrl + '/api/widget/' + widgetId)
        .pipe(function (response) {
          return response;
        });
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
