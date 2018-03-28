import {HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
// injecting service into module
import { Http, Response, HttpModule, Headers } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class WebsiteService {
  constructor(private _http: Http) {}

  createWebsite(userId: string, website: any) {
    website._id = (String(Date.now()) + Math.floor(Math.random() * 10000)).slice(-3);
    website.developerId = userId;
    this.websites.push(website);
    return website;
  }

  findWebsitesByUser(userId: string) {
    const websitesList = [];
    for (let x = 1; x < this.websites.length; x++) {
      if (this.websites[x].developerId === userId) {
        websitesList.push(this.websites[x]);
      }
    }
    return websitesList;
  }

  findWebsiteById(websiteId: string) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        return this.websites[x];
      }
    }
  }

  updateWebsite(websiteId: string, website: any) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        this.websites[x] = website;
        return this.websites[x];
      }
    }
  }

  deleteWebsite(websiteId: string) {
      this.websites = this.websites.filter(function(el) {
          return el._id !== websiteId;
      });
      return this.websites;
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
