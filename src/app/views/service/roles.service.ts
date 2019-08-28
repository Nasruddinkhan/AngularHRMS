import { Injectable } from '@angular/core';
import { ErrorHandling } from './error.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Roles } from '../model/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseURL=environment.baseUrl;
  constructor(private http:HttpClient,private errorHandling: ErrorHandling) { }
  getRolesDetails():Observable<any>{
    return this.http.get(this.baseURL+`role/roles`).pipe(
      catchError(this.errorHandling.handleError))
  }

  saveRoleDetail(role:Roles):Observable<any>{
    return this.http.post(this.baseURL+`role/add`, role).pipe(
      catchError(this.errorHandling.handleError))
  }
  deleteRoles(roleID:number):Observable<any>{
    return this.http.delete(this.baseURL + `role/${roleID}/delete`).pipe(
      catchError(this.errorHandling.handleError));
  }
}
