import {HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
// injecting service into module
import { Http, Response, HttpModule, Headers } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class WebsiteService {
  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;

  createWebsite(userId: string, website: any) {
    return this._http.post(this.baseUrl + '/api/user/' + userId + '/website', website)
      .pipe(function (response) {
        return response;
      });
  }

  findWebsitesByUser(userId: string) {
    return this._http.get(this.baseUrl + '/api/user/' + userId + '/website')
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findWebsiteById(websiteId: string) {
    return this._http.get(this.baseUrl + '/api/website/' + websiteId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updateWebsite(websiteId: string, website: any) {
    return this._http.put(this.baseUrl + '/api/website/' + websiteId, website)
      .pipe(function (response) {
        return response;
      });
  }

  deleteWebsite(websiteId: string) {
    return this._http.delete(this.baseUrl + '/api/website/' + websiteId)
      .pipe(function (response) {
        return response;
      });
  }
}

// Implement the following API in the WebsiteService service
// 1. createWebsite(userId, website) - adds the website parameter instance to the local websites array. The
// new website's developerId is set to the userId parameter
// 2. findWebsitesByUser(userId) - retrieves the websites in local websites array whose developerId matches
// the parameter userId
// 3. findWebsiteById(websiteId) - retrieves the website in local websites array whose _id matches the
// websiteId parameter
// 4. updateWebsite(websiteId, website) - updates the website in local websites array whose _id matches
// the websiteId parameter
// 5. deleteWebsite(websiteId) - removes the website from local websites array whose _id matches the
// websiteId parameter
