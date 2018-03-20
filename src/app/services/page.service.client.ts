import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
// injecting service into module
@Injectable()
export class PageService {
  constructor() { }
  pages = [
      {_id: '321', name: 'Post 1', websiteId: '456', description: 'Lorem'},
      {_id: '432', name: 'Post 2', websiteId: '456', description: 'Lorem'},
      {_id: '543', name: 'Post 3', websiteId: '456', description: 'Lorem'},
      {_id: '234', name: 'Post 4', websiteId: '890', description: 'Lorem'},
      {_id: '567', name: 'Post 5', websiteId: '890', description: 'Lorem'}
  ];
  api = {
    'createPage' : this.createPage,
    'findPageByWebsiteId' : this.findPageByWebsiteId,
    'findPageById' : this.findPageById,
    'updatePage' : this.updatePage,
    'deletePage' : this.deletePage
  };

  createPage(websiteId: string, page: any) {
    page._id = (String(Date.now()) + Math.floor(Math.random() * 10000)).slice(-3);
    page.websiteId = websiteId;
    this.pages.push(page);
    return page;
  }

  findPageByWebsiteId(websiteId: string) {
    const pagesList = [];
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x].websiteId === websiteId) {
        pagesList.push(this.pages[x]);
      }
    }
      return pagesList;
  }

  findPageById(pageId: string) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        return this.pages[x];
      }
    }
  }

  updatePage(pageId: string, page: any) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        this.pages[x] = page;
        return this.pages[x];
      }
    }
  }

  deletePage(pageId: string) {
      this.pages = this.pages.filter(function(el) {
          return el._id !== pageId;
      });
      return this.pages;
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
