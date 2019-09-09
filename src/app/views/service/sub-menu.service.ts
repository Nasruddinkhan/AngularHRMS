import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { ErrorHandling } from './error.service';
import {HttpClient} from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SubMenus } from '../model/submenu.model';
@Injectable({
  providedIn: 'root'
})
export class SubMenuService {

  private baseURL=environment.baseUrl;
  constructor(private http:HttpClient, private errorHandling: ErrorHandling) { }
  getMenuDetails():Observable<any>{
    return this.http.get(this.baseURL+`submenu/menus`).pipe(
      catchError(this.errorHandling.handleError))
  }

  saveSubMenuDetails(menuID:number, submenu:SubMenus):Observable<any>{
 console.log(menuID, JSON.stringify(submenu));
    return this.http.post(this.baseURL+`submenu/${menuID}/savesubmenus`, submenu).pipe(
      catchError(this.errorHandling.handleError))
  }
}
