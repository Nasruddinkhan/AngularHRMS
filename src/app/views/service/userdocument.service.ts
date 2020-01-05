import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserdocumentService {

  private baseURL = environment.baseUrl;
  constructor(private http: HttpClient ) { }

  async getOnLoadDropDowns(userId:number):Promise<any>{
    return await this.http.get(this.baseURL + `userdoc/${userId}/onloaddata`).toPromise();
  }
}
