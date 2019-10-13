import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandling } from './error.service';
import { catchError } from 'rxjs/operators';
import { CityMaster } from '../model/CityMaster';

@Injectable({
    providedIn: 'root'
  })
  export class CityService {

    private baseURL = environment.baseUrl;
  constructor(private http: HttpClient, private errorHandling: ErrorHandling ) { }


    getStatesList(): Observable<any> {
      console.log(this.baseURL);
      return this.http.get(this.baseURL + `citymst/getstate`).pipe(
        catchError(this.errorHandling.handleError));
    }
    getCityDetails():Observable<any>{
      return this.http.get(this.baseURL + `citymst/getAllCityDetails`).pipe(
        catchError(this.errorHandling.handleError));
    }
    saveCityDetail(citymst:CityMaster, stateID :Number):Observable<any>{
      console.log(this.baseURL);
      return this.http.post(this.baseURL+`citymst/${stateID}/savecity`, citymst).pipe(
        catchError(this.errorHandling.handleError))
    }
    
    deleteCity(deleteCity):Observable<any>{
      return this.http.delete(this.baseURL + `citymst/${deleteCity}/deletecity`).pipe(
        catchError(this.errorHandling.handleError));
    }
  }
