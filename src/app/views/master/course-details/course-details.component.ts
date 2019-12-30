import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { CourseModel } from '../../model/course.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TemplateRef } from '@angular/core/src/linker/template_ref';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  p: number = 1;
  initialPageSize: number = 5;
  courseID: string;
  courseName: string;
  corurseList = [];
  modalRef: BsModalRef;
  loading: boolean = false;
  deletCourseID:string;
  constructor(private service: CourseService, 
    private modalService: BsModalService,
    private toastr:ToastrService) { }
  ngOnInit() {
    this.getCourses();
  }
  getCourses() {
    this.loading = true;
    this.service.findAllCourse().then((res: any) => {
      this.corurseList= res;
      this.loading = false;
    },err=>{
      this.corurseList=[];
     // alert(JSON.stringify(err.error));
      this.loading = false;
    });
  }
  async onSubmit(form: NgForm) {
    if (form.valid) {
      let course = new CourseModel;
      course.courseID = form.value.courseID;
      course.courseName=form.value.courseName;
      course.activeStatus = 1;
      await this.service.saveCourseDetails(course).then((msg: any)=>{
        this.loading = false;
        console.log(msg);
      
        this.toastr.success("add course success fully", 'Course Master', {
          positionClass: 'toast-bottom-right'
        });
        form.reset();
      },err=>{
        this.toastr.error(err.error.message, 'Internal Error', {
          positionClass: 'toast-bottom-right'
        });
      });
      
      this.getCourses();
  }
}
openCourseModal(template: TemplateRef<any>, delCourseID) {
  this.deletCourseID=delCourseID;
  this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
}
decline(): void {
  this.modalRef.hide();
}
confirm(): void {
  this.deleteCourse();
  this.modalRef.hide();
}
async deleteCourse(){
  this.loading=true;
  this.service.deleteCourse(this.deletCourseID).then((msg: any) => {
    this.loading = false;
    this.toastr.success(this.deletCourseID + ' has been  successfully', 'Delete Skill', {
      positionClass: 'toast-bottom-right'
    });
    this.getCourses();
  }, err => {
    this.getCourses();
    this.loading = false;
    this.toastr.error(err.msg, 'Internal Errors', {
      positionClass: 'toast-bottom-right'
    });
  });
}
}
