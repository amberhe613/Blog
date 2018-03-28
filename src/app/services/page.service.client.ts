import {HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
// injecting service into module
import { Http, Response, HttpModule, Headers } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class PageService {
  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;

  createPage(websiteId: string, page: any) {
    return this._http.post(this.baseUrl + '/api/website/' + websiteId + '/page', page)
      .pipe(function (response) {
        return response;
      });
  }

  findPageByWebsiteId(websiteId: string) {
    return this._http.get(this.baseUrl + '/api/website/' + websiteId + '/page')
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findPageById(pageId: string) {
    return this._http.get(this.baseUrl + '/api/page/' + pageId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updatePage(pageId: string, page: any) {
    return this._http.put(this.baseUrl + '/api/page/' + pageId, page)
      .pipe(function (response) {
        return response;
      });
  }

  deletePage(pageId: string) {
    return this._http.delete(this.baseUrl + '/api/page/' + pageId)
      .pipe(function (response) {
        return response;
      });
  }
}

// Implement the following API in the PageService service
// 1. createPage(websiteId, page) - adds the page parameter instance to the local pages array. The new page's
// websiteId is set to the websiteId parameter
// 2. findPageByWebsiteId(websiteId) - retrieves the pages in local pages array whose websiteId matches
// the parameter websiteId
// 3. findPageById(pageId) - retrieves the page in local pages array whose _id matches the pageId parameter
// 4. updatePage(pageId, page) - updates the page in local pages array whose _id matches the pageId
// parameter
// 5. deletePage(pageId) - removes the page from local pages array whose _id matches the pageId parameter
