import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserUploadDoc } from '../model/userdoc.model';


@Injectable({
  providedIn: 'root'
})
export class UserdocumentService {

  private baseURL = environment.baseUrl;
  constructor(private http: HttpClient ) { }
  async deleteDocuments(userDocID:number, userID:number):Promise<any>{
    return await this.http.delete(this.baseURL + `userdoc/${userDocID}/${userID}/deletedocs`).toPromise();
  }
  async getAllDocuments(userId:number):Promise<any>{
    return await this.http.get(this.baseURL + `userdoc/${userId}/uploaddocs`).toPromise();
  }
  async getOnLoadDropDowns(userId:number):Promise<any>{
    return await this.http.get(this.baseURL + `userdoc/${userId}/onloaddata`).toPromise();
  }
  async uploadDocuments(formData:UserUploadDoc):Promise<any>{
    return await this.http.post(this.baseURL + `userdoc/upload`,formData ).toPromise();
  }
  async getApplicationData(userId:number):Promise<any>{
    return await this.http.get(this.baseURL + `appliction/${userId}/previewapplication` ).toPromise();
  }
  async getJsoftApplication(userID:number,applicationform:string):Promise<any>{
    return await this.http.post(this.baseURL + `appliction/${userID}/downloadapplication`,  applicationform).toPromise();
  }
  }