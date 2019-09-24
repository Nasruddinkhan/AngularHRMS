import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { ErrorHandling } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class SearchEmployeesService {
  private baseURL=environment.baseUrl;
  constructor(private http:HttpClient, private errorHandling:ErrorHandling) { }
  findAllUser():Observable<any>{
    return this.http.get(this.baseURL+`searchemployees/emplist`).pipe(
      catchError(this.errorHandling.handleError))
  }
  userApprovedStatus(emailID:string,status:string,approver:string,roleId:number):Observable<any>{
    return this.http.get(this.baseURL+`user/email/${emailID}/status/${status}/approver/${approver}/role/${roleId}/approvedetails`).pipe(
      catchError(this.errorHandling.handleError))
  }
}
