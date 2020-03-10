import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { WorkStatus } from '../model/workstatus.model';

@Injectable({
  providedIn: 'root'
})
export class WorkstatusService {
  private baseURL = environment.baseUrl;
  constructor(private http: HttpClient) { }
  async saveWorkRemark(workRemark:WorkStatus,skillId:number, skillElement:number,userId:number){
    return await this.http.post(this.baseURL + `workStataus/${skillId}/${skillElement}/${userId}/add`,workRemark ).toPromise();
  }
}
