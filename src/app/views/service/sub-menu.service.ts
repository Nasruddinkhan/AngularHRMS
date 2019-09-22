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
  getSubMenuDetails():Observable<any>{
    return this.http.get(this.baseURL+`submenu/submenus`).pipe(
      catchError(this.errorHandling.handleError))
  }

  saveSubMenuDetails(menuID:number, submenu:SubMenus,  roleID:number):Observable<any>{
 console.log(menuID, JSON.stringify(submenu), roleID);
    return this.http.post(this.baseURL+`submenu/${menuID}/${roleID}/savesubmenus`, submenu).pipe(
      catchError(this.errorHandling.handleError))
  }
  deleteSubMenus(subMenuID:string):Observable<any>{
    alert(this.baseURL + `submenu/${subMenuID}/delete`);
    return this.http.delete(this.baseURL + `submenu/${subMenuID}/delete`).pipe(
      catchError(this.errorHandling.handleError));
  }
}
