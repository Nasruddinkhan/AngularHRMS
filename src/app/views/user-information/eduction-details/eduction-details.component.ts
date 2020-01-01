import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { UniversityService } from '../../service/university.service';
import { NgForm } from '@angular/forms';
import { EducationService } from '../../service/education.service';
import { EducationModel } from '../../model/education.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EductionEditDetailsComponent } from './education-edit.details.component';
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
  univercityID: string;
  comments: string;
  collegeName: string
  univercity: string;
  univercityList = [];
  courseList = [];
  startyear = new Date().getFullYear();
  yearList = [];
  toYear: string;
  toMonth: string;
  fromYear: string;
  fromMonth: string;
  loading :boolean=false;
  userid:number;
  bsModalRef: BsModalRef;
  objString:string;
  constructor(private courseService: CourseService,
    private universityService: UniversityService,
    private educationService: EducationService,
    private toastr:ToastrService,
    private modalService: BsModalService) { }
    

  async ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.userid = user.userID;
    this.getYears();
    await this.getCourse();
    this.getUniversity();
    await this.getEducationList();
    this.checkDropDownsBens();
  }
  async checkDropDownsBens(){
   if(this.eductionList.length ==0)
   await this.getCourse();
   if(this.eductionList.length !==0){
    this.eductionList.forEach(edu=>{
      const index :any= this.courseList.filter(cor=> cor.courseID == edu.courseID);
      this.courseList.splice(index, 1);
   });
  }
  }
  async getEducationList() {
    await this.educationService.findAllEducation().then((res: any) => {
      this.eductionList = res;
    },err=>{
      this.eductionList=[];
    });
  }
  getYears() {
    for (let i = this.startyear; i > this.startyear - 25; i--)
      this.yearList.push(i);
  }
  getUniversity() {
    this.universityService.findAllUniversity().subscribe((res: any) => {
      this.univercityList = res;
    });
  }
  async getCourse() {
    await this.courseService.findAllCourse().then((res: any) => {
      this.courseList = res;
    });
  }
 async onSubmit(form: NgForm) {
    //alert(JSON.stringify(form.value));
    if (form.valid) {
      let education = new EducationModel;
      let curID = form.value.courseID;
      let univId = form.value.univercityID;
      education.activeStatus=1;
      education.collegeName = form.value.collegeName;
      education.comments=form.value.comments;
      education.fromDate=form.value.fromMonth+"-"+form.value.fromYear;
      education.toDate=form.value.toMonth+"-"+form.value.toYear;
      await this.educationService.saveEducationDetails(education, univId,curID, this.userid).then((msg: any)=>{
        this.loading = false;
        console.log(msg);
      
        this.toastr.success("add education success fully", 'Educaion Master', {
          positionClass: 'toast-bottom-right'
        });
        form.reset();
      },err=>{
        this.toastr.error(err.error.message, 'Internal Error', {
          positionClass: 'toast-bottom-right'
        });
      });
      await this.getCourse();
      await this.getEducationList();
      this.checkDropDownsBens();
    }
  }
  openModalWithComponent(edu) { 
    this.objString= JSON.stringify(edu)   
    const initialState = {

      title: 'Edit Education Details'+ edu.courseName,
      closeBtnName: 'Closeedu',
      educationID:edu.educationID,  
      fromDate:edu.fromDate,     
      toDate:edu.toDate,       
      collegeName:edu.collegeName,  
      courseID:edu.courseID,     
      courseName:edu.courseName,   
      universityID:edu.universityID, 
      univercityName:edu.univercityName,
      comments:edu.comments   
      
    };
    this.bsModalRef = this.modalService.show(EductionEditDetailsComponent, { initialState, class: 'modal-lg'});
  //  this.bsModalRef.content.closeBtnName = 'Close';
    // (click)="bsModalRef.hide()"

}
}
