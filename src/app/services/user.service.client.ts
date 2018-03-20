import { Injectable } from '@angular/core';
// injecting service into module
import { Http, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  constructor() { }
  users = [
    {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder'},
    {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
    {_id: '345', username: 'charlie', password: 'charlie', firstName: 'Charlie', lastName: 'Garcia'}
  ];
  api = {
    'createUser' : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser
  };

  createUser(user: any) {
    user._id = (String(Date.now()) + Math.floor(Math.random() * 10000)).slice(-3);
    this.users.push(user);
    return user;
  }

  findUserById(userId: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }

  findUserByUsername(username: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username) {
        return this.users[x];
      }
    }
  }

  updateUser(userId: string, user: any) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        this.users[x] = user;
        return this.users[x];
      }
    }
  }

  deleteUser(userId: string) {
      this.users = this.users.filter(function(el) {
          return el._id !== userId;
      });
      return this.users;
  }

  findUserByCredentials(username, password) {
    return this.users.find(function (user) {
      return user.username === username && user.password === password
    });
  }
}
