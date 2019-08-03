import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { ErrorHandling } from './error.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SkillelementService {
  private baseURL=environment.baseUrl;
  constructor(private http:HttpClient,private errorHandling: ErrorHandling) { }

  getSkillsList(){
    console.log(this.baseURL);
    return this.http.get(this.baseURL+`skillelement/getskills`).pipe(
      catchError(this.errorHandling.handleError))
  }
}
