import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ErrorHandling } from './error.service';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL=environment.baseUrl;
  constructor(private http:HttpClient,private errorHandling: ErrorHandling) { }
  registerUser(user:String, status:string):Observable<any>{
    console.log(this.baseURL+status);
    return this.http.post(this.baseURL+`user/${status}/register`, user).pipe(
      catchError(this.errorHandling.handleError))
  }

  changePassword(email:String, password:string, userType:string):Observable<any>{
    return this.http.get(this.baseURL+`user/${email}/${password}/${userType}/chgpassword`).pipe(
      catchError(this.errorHandling.handleError))
  }
  savePersonalDetails(user:String):Observable<any>{
    console.log(this.baseURL+status);
    return this.http.post(this.baseURL+`user/personaldetails`, user).pipe(
      catchError(this.errorHandling.handleError))
  }
  
}
