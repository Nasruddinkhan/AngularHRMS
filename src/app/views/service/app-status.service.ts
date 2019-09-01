import { Injectable } from '@angular/core';
import { ErrorHandling } from './error.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { StatusMaster } from '../model/status.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AppStatusService {
  private baseURL=environment.baseUrl;
  constructor(private http:HttpClient,private errorHandling: ErrorHandling) { }
  saveStatusDetail(status:StatusMaster):Observable<any>{
    console.log(this.baseURL);
    return this.http.post(this.baseURL+`status/add`, status).pipe(
      catchError(this.errorHandling.handleError))
  }
  getStatusDetails():Observable<any>{
    return this.http.get(this.baseURL+`status/statusdtls`).pipe(
      catchError(this.errorHandling.handleError))
  }
  deleteStatus(statusID:String):Observable<any>{
    return this.http.delete(this.baseURL + `status/${statusID}/delete`).pipe(
      catchError(this.errorHandling.handleError));
  }
}
