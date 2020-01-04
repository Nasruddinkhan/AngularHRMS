import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { UniversityService } from '../../service/university.service';
import { NgForm } from '@angular/forms';
import { EducationService } from '../../service/education.service';
import { EducationModel } from '../../model/education.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
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
  educationID:number;
  title:string;
  btnName:string;
  constructor(private courseService: CourseService,
    private universityService: UniversityService,
    private educationService: EducationService,
    private toastr:ToastrService,
    private modalService: BsModalService) { }
    

  async ngOnInit() {
    this.btnName = 'Submit'
    this.title='Add Qualiitation';
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
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
 async onSubmit(form: NgForm) {
    //alert(JSON.stringify(form.value));
   
    if (form.valid) {
      let educatonMsg;
      let education = new EducationModel;
      let curID = form.value.courseID;
      let univId = form.value.univercityID;
      let educationID = form.value.educationID;
      if(!this.isEmpty(education)){
        education.educationID = educationID;
        educatonMsg ='update education successfully';
      }else{
        educatonMsg='add education successfully';
      } 
      education.activeStatus=1;
      education.collegeName = form.value.collegeName;
      education.comments=form.value.comments;
      education.fromDate=form.value.fromMonth+"-"+form.value.fromYear;
      education.toDate=form.value.toMonth+"-"+form.value.toYear;
      await this.educationService.saveEducationDetails(education, univId,curID, this.userid).then((msg: any)=>{
        this.loading = false;
        this.title='Add Qualiitation';
        this.btnName='Submit';
        this.toastr.success(educatonMsg, 'Educaion Master', {
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
  async editEducationDetails(edu) { 
    let courseList;
    await this.courseService.findAllCourse().then((res: any) => {
      courseList = res;
    });
 //   const initialState = {
      this.title= 'Edit Details ['+ edu.courseName+']',
      
     this.educationID=edu.educationID;  
     this.toYear= edu.toDate.split("-")[1];
     this.toMonth= edu.toDate.split("-")[0];
     this.fromYear= edu.fromDate.split("-")[1];
     this.fromMonth= edu.fromDate.split("-")[0];    
     this.collegeName=edu.collegeName;  
     this.courseID=edu.courseID;     
     this.univercityID=edu.universityID; 
     this.comments=edu.comments ;  
     this.yearList=this.yearList;
     this.userid=this.userid;
     this.univercityList =this.univercityList;
     this.courseList=courseList;
     this.btnName='Update';
      //bsModal:this.bsModalRef
    }
   // this.bsModalRef = this.modalService.show(EductionEditDetailsComponent, { initialState, class: 'modal-lg'});
   // this.bsModalRef.content.closeBtnName = 'Close';
    // (click)="bsModalRef.hide()"
    async deleteEducationDetails(eID:number){
     // alert(eID);
     this.loading=true;
      this.educationService.deleteEducation(eID).then((res:any)=>{
        this.loading=false;
        this.toastr.success('Delete Education Details', 'Educaion Master', {
          positionClass: 'toast-bottom-right'
        });
       
      }, err=>{
        this.loading=false;
        this.toastr.error(err.error.message, 'Internal Error', {
          positionClass: 'toast-bottom-right'
        });
        this.eductionList=[];
      });
      this.courseList=[];
      this.eductionList=[];
      await this.getCourse();
      await this.getEducationList();
      this.checkDropDownsBens();
    }
   /* public captureScreen()
{
var data = document.getElementById('contentToConvert');
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 208;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
pdf.save('MYPdf.pdf'); // Generated PDF
});
}*/
}


