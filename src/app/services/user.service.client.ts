// injecting service into module
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {SharedService} from './shared.service.client';
@Injectable()
export class UserService {

  baseUrl = environment.baseUrl;
  options: RequestOptions = new RequestOptions();
  constructor(private _http: Http, private sharedService: SharedService,
              private router: Router) {}

  login(username: String, password: String) {
    const url = 'http://localhost:8080/api/login';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    console.log(credentials);
    return this._http.post(url, credentials, this.options)
      .map((response: Response) => {
        console.log(response.json());
        return response.json();
      });
  }

  logout() {
    const url = 'http://localhost:8080/api/logout';
    this.options.withCredentials = true;
    return this._http.post(url, '', this.options)
      .map((status) => {
        return status;
      });
  }

  register(username, password) {
    const url = 'http://localhost:8080/api/register';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this._http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }


  loggedIn() {
    const url = 'http://localhost:8080/api/loggedIn';
    this.options.withCredentials = true;
    return this._http.post(url, '', this.options)
      .map((res: Response) => {
        const user = res.json();
        if (user !== 0) {
          this.sharedService.user = user;
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }


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
