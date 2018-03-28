import {HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
// injecting service into module
import { Http, Response, HttpModule, Headers } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {
  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;
  createUser(user: any) {
    return this._http.post(this.baseUrl + '/api/user', user)
      .pipe(function (response) {
        return response;
      });
  }
  findUserById(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }
  findUserByCredentials(username, password) {
    return this._http.get(this.baseUrl + '/api/user' + '?username=' + username + '&password=' + password)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
    }
  findUserByUsername(username) {
    return this._http.get(this.baseUrl + '/api/user' + '?username=' + username)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }
  updateUser(userId: string, user: any) {
    return this._http.put(this.baseUrl + '/api/user/' + userId, user)
      .pipe(function (response) {
        return response;
      });
  }
  deleteUser(userId: string) {
    return this._http.delete(this.baseUrl + '/api/user/' + userId)
      .pipe(function (response) {
        return response;
      });
  }
}
