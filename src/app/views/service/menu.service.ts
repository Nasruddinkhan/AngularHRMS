import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { ErrorHandling } from './error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Menus } from '../model/menus.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseURL=environment.baseUrl;
  constructor(private http:HttpClient,private errorHandling: ErrorHandling) { }
  getMenuDetails():Observable<any>{
    return this.http.get(this.baseURL+`menu/menus`).pipe(
      catchError(this.errorHandling.handleError))
  }
  saveMenuDetail(menu:Menus):Observable<any>{
    return this.http.post(this.baseURL+`menu/add`, menu).pipe(
      catchError(this.errorHandling.handleError))
  }
}
