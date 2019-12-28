import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ErrorHandling } from './error.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Address } from '../model/address.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseURL = environment.baseUrl;
  constructor(private http: HttpClient, private errorHandling: ErrorHandling ) { }

  saveAddressDetail(address:Address, userID :Number, cityId:number):Observable<any>{
    console.log(this.baseURL);
    return this.http.post(this.baseURL+`address/${userID}/${cityId}/save`, address).pipe(
      catchError(this.errorHandling.handleError))
  }
  getUserAddress(userID :Number){
   
    return this.http.get(this.baseURL+`address/${userID}/useraddress`).pipe(
      catchError(this.errorHandling.handleError))
  }  
}
