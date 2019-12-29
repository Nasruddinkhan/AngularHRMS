import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UniversityService } from '../../service/university.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { UniversityModel } from '../../model/university.model';
import { TemplateRef } from '@angular/core/src/linker/template_ref';

@Component({
  selector: 'app-univercity',
  templateUrl: './univercity.component.html',
  styleUrls: ['./univercity.component.scss']
})
export class UnivercityComponent implements OnInit {
  univercityList=[];
  p: number = 1;
  initialPageSize: number = 5;
  univercityID: string;
  univercityName: string;
  modalRef: BsModalRef;
  loading: boolean = false;
  deletUnivercityID:string;
  constructor(private modalService: BsModalService,private service:UniversityService,
    private toastr:ToastrService) { }
  ngOnInit() {
    this.findAllUniversity();
  }
  findAllUniversity() {
    this.loading = true;
    this.service.findAllUniversity().subscribe((res: any) => {
      this.univercityList= res;
      this.loading = false;
    },err=>{
      this.univercityList=[];
     // alert(JSON.stringify(err.error));
      this.loading = false;
    });
  }
  async onSubmit(form: NgForm) {
    if (form.valid) {
      let univercity = new UniversityModel;
      univercity.universityID = form.value.univercityID;
      univercity.univercityName=form.value.univercityName;
      univercity.activeStatus = 1;
      await this.service.saveUniversityDetails(univercity).then((msg: any)=>{
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
      
      this.findAllUniversity();
  }
}
openUniversityModal(template: TemplateRef<any>, delUnivercityID) {
  this.deletUnivercityID=delUnivercityID;
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
  this.service.deleteUniversity(this.deletUnivercityID).then((msg: any) => {
    this.loading = false;
    this.toastr.success(this.deletUnivercityID + ' has been  successfully', 'Delete Skill', {
      positionClass: 'toast-bottom-right'
    });
    this.findAllUniversity();
  }, err => {
    this.findAllUniversity();
    this.loading = false;
    this.toastr.error(err.msg, 'Internal Errors', {
      positionClass: 'toast-bottom-right'
    });
  });
}
}
