import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { ErrorHandling } from './error.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient } from '@angular/common/http';
import { UniversityModel } from '../model/university.model';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private baseURL = environment.baseUrl;
  constructor(private http: HttpClient, private errorHandling: ErrorHandling) { }

  findAllUniversity():Observable<any>{
    return this.http.get(this.baseURL + `university/getuniversitys`).pipe(
      catchError(this.errorHandling.handleError));
  }
  async saveUniversityDetails(universityModel:UniversityModel):Promise<any>{
    return await this.http.post(this.baseURL + `university/add`, universityModel).toPromise();
  }
  async  deleteUniversity(deleteUniversity:string):Promise<any>{
    return await this.http.delete(this.baseURL + `university/${deleteUniversity}/delete`).toPromise();
  }

}
