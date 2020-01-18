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

  async loginUser(user) :Promise<any>{//
    return await this.http.post<any>('http://localhost:8081/HRMS/login/validateUser', user).toPromise();
    //return await this.http.post<any>('http://192.168.43.61:8081/HRMS/login/validateUser', user).toPromise();
  }


  getToken() {
    console.log("token ::::::::: "+sessionStorage.getItem('token'));
    return sessionStorage.getItem('token')
  }

  loggedIn() {
    return !!sessionStorage.getItem('token')    
  }
}
