import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ErrorHandling } from './error.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { EducationModel } from '../model/education.model';



@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private baseURL = environment.baseUrl;
  constructor(private http: HttpClient, private errorHandling: ErrorHandling ) { }


  async findAllEducation():Promise<any>{
    return await this.http.get(this.baseURL + `education/geteducations`).toPromise();
  }
  async saveEducationDetails(education:EducationModel, univId:string, curID:string, userID:number):Promise<any>{
    return await this.http.post(this.baseURL + `education/${userID}/${univId}/${curID}/add`, education).toPromise();
  }
  async  deleteEducation(deleteEducation:number):Promise<any>{
    return await this.http.delete(this.baseURL + `education/${deleteEducation}/delete`).toPromise();
  }
}
