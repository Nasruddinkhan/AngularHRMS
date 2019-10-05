import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ErrorHandling } from './error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StateMaster } from '../model/stateModel';

@Injectable({
    providedIn: 'root'
  })
  export class StateService {
    private baseURL=environment.baseUrl;
   
    constructor(private http:HttpClient,private errorHandling: ErrorHandling) { }

    getAllStateDetails():Observable<any>{
      console.log(this.baseURL);
      return this.http.get(this.baseURL+`statemst/getAllStateDetails`).pipe(
        catchError(this.errorHandling.handleError))
    }
    saveStateDetails(state:StateMaster):Observable<any>{
      console.log(this.baseURL);
      return this.http.post(this.baseURL+`statemst/savestate`, state).pipe(
        catchError(this.errorHandling.handleError))
    }
    deleteState(stateId:number):Observable<any>{
      return this.http.delete(this.baseURL + `statemst/${stateId}/deletestate`).pipe(
        catchError(this.errorHandling.handleError));
    }
  }