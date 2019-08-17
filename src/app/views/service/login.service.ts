import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http/';

/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  private baseURL=environment.baseUrl;

  loginUser(user) {
    return this.http.post<any>(this.baseURL+'login/validateUser', user)
  }

  getToken() {
    console.log("token ::::::::: "+localStorage.getItem('token'));
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}
