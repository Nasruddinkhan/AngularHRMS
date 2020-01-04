import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { DocumentModel } from '../model/document.model';



@Injectable({
  providedIn: 'root'
})
export class DocumentmasterService {

  private baseURL = environment.baseUrl;
  constructor(private http: HttpClient ) { }

  async findAllDocuments():Promise<any>{
    return await this.http.get(this.baseURL + `documentmst/getDocuments`).toPromise();
  }
  async saveDocumentDetails(document:DocumentModel):Promise<any>{
    return await this.http.post(this.baseURL + `documentmst/savedocument`, document).toPromise();
  }
  async  deleteDocuments(deleteDocumentID:string):Promise<any>{
    return await this.http.delete(this.baseURL + `documentmst/${deleteDocumentID}/deletedocument`).toPromise();
  }
}
