import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { ErrorHandling } from './error.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SkillElementsMaster } from '../model/skillelementmodel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SkillelementService {
  private baseURL = environment.baseUrl;
  constructor(private http: HttpClient, private errorHandling: ErrorHandling) { }

  getSkillsList(): Observable<any> {
    console.log(this.baseURL);
    return this.http.get(this.baseURL + `skillelement/getskills`).pipe(
      catchError(this.errorHandling.handleError));
  }
  saveSkillElementDetails(skillid: number, skillelements: SkillElementsMaster): Observable<any> {
    return this.http.post(this.baseURL + `skillelement/${skillid}/savesubskills`, skillelements).pipe(
      catchError(this.errorHandling.handleError));
  }
  getSkillElementsDetails():Observable<any>{
    return this.http.get(this.baseURL + `skillelement/getskillelementsdetails`).pipe(
      catchError(this.errorHandling.handleError));
  }
  deleteSkillElements(skillementID:number):Observable<any>{
    return this.http.delete(this.baseURL + `skillelement/${skillementID}/deleteskillelements`).pipe(
      catchError(this.errorHandling.handleError));
  }
}
