import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ErrorHandling } from './error.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CourseModel } from '../model/course.model';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseURL = environment.baseUrl;
  constructor(private http: HttpClient, private errorHandling: ErrorHandling ) { }

  findAllCourse():Promise<any>{
    return this.http.get(this.baseURL + `course/getcourses`).toPromise();
  }
  async saveCourseDetails(course:CourseModel):Promise<any>{
    return await this.http.post(this.baseURL + `course/add`, course).toPromise();
  }
  async  deleteCourse(deleteCourse:string):Promise<any>{
    return await this.http.delete(this.baseURL + `course/${deleteCourse}/delete`).toPromise();
  }

}