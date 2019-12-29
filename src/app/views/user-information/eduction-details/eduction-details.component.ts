import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { UniversityService } from '../../service/university.service';
import { NgForm } from '@angular/forms';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Component({
  selector: 'app-eduction-details',
  templateUrl: './eduction-details.component.html',
  styleUrls: ['./eduction-details.component.scss']
})
export class EductionDetailsComponent implements OnInit {
  eductionList = [];
  courseID: string;
  univercityID:string;
  comments: string;
  collegeName: string
  univercity: string;
  univercityList=[];
  courseList = [];
  startyear=new Date().getFullYear();
  yearList=[];
  toYear:string;
  toMonth:string;
  fromYear:string;
  fromMonth:string;
  constructor(private courseService: CourseService,private universityService:UniversityService) { }

  ngOnInit() {
    this.getYears();
    this.getCourse();
    this.getUniversity();
    }
    getYears(){
      for(let i=this.startyear;i>this.startyear-25;i--){
        this.yearList.push(i);
      }
    }
    getUniversity(){
      this.universityService.findAllUniversity().subscribe((res:any)=>{
        this.univercityList=res;
      });
    }
  getCourse() {
    this.courseService.findAllCourse().subscribe((res: any) => {
      this.courseList = res;
    });
  }
  onSubmit(form:NgForm){
  //alert(JSON.stringify(form.value));
  if(form.valid){

  }
  }
}
