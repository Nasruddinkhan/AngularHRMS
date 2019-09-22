import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AsingMenuService {
private baseURL = environment.baseUrl;
  constructor(private http:HttpClient) { }
  async getOnloadDropdowns(){
    return  this.http.get(this.baseURL+`hrms/onloadDropdowns`).toPromise();
  }
}
