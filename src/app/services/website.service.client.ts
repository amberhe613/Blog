import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
// injecting service into module
@Injectable()
export class WebsiteService {
  constructor() { }
  websites = [
    { _id: "123", name: "Facebook", developerId: "456", description: "Lorem" },
    { _id: "234", name: "Tweeter", developerId: "456", description: "Lorem" },
    { _id: "456", name: "Gizmodo", developerId: "456", description: "Lorem" },
    { _id: "890", name: "Go", developerId: "123", description: "Lorem" },
    { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
    { _id: "678", name: "Checkers", developerId: "123", description: "Lorem" },
    { _id: "789", name: "Chess", developerId: "234", description: "Lorem" }
  ];
  api = {
    'createWebsite' : this.createWebsite,
    'findWebsitesByUser' : this.findWebsitesByUser,
    'findWebsiteById' : this.findWebsiteById,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };
  createWebsite(userId: string, website: any) {
    website._id = (String(Date.now()) + Math.floor(Math.random() * 10000)).slice(-3);
    website.developerId = userId;
    this.websites.push(website);
    return website;
  }

  findWebsitesByUser(userId: string) {
    const websitesList = [];
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x].developerId !== userId) {
        websitesList.push(this.websites[x]);
        return websitesList;
      }
    }
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
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        this.websites.slice(x, 1);
        return this.websites;
      }
    }
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
