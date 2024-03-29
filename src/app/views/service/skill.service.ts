import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorHandling } from './error.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SkillMaster } from '../model/skillmodel';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private baseURL=environment.baseUrl;
 
  constructor(private http:HttpClient,private errorHandling: ErrorHandling) { }
  getAllSkillDetails():Observable<any>{
    console.log(this.baseURL);
    return this.http.get(this.baseURL+`skillmaster/getskills`).pipe(
      catchError(this.errorHandling.handleError))
  }
  saveSkillDetail(skill:SkillMaster):Observable<any>{
    console.log(this.baseURL);
    return this.http.post(this.baseURL+`skillmaster/saveskill`, skill).pipe(
      catchError(this.errorHandling.handleError))
  }
  deleteSkills(skillID:number):Observable<any>{
    return this.http.delete(this.baseURL + `skillmaster/${skillID}/deleteskill`).pipe(
      catchError(this.errorHandling.handleError));
  }
}
