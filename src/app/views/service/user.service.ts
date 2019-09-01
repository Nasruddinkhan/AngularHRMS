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
  registerUser(user:String):Observable<any>{
    console.log(this.baseURL);
    return this.http.post(this.baseURL+`user/register`, user).pipe(
      catchError(this.errorHandling.handleError))
  }
}
