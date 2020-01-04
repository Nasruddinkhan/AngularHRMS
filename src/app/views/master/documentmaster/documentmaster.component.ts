import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DocumentModel } from '../../model/document.model';
import { DocumentmasterService } from '../../service/documentmaster.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-documentmaster',
  templateUrl: './documentmaster.component.html',
  styleUrls: ['./documentmaster.component.scss']
})
export class DocumentmasterComponent implements OnInit {
  //menuAccessList:any;
  chckPapeAccess:boolean=false;
  p: number = 1;
  initialPageSize: number = 5;
  documentID: string;
  documentName: string;
  documentList = [];
  modalRef: BsModalRef;
  loading: boolean = false;
  deleteDocumentID:string;

  constructor(private router:Router, 
    private modalService: BsModalService,
    private toastr:ToastrService,
    private service:DocumentmasterService) { }

 async ngOnInit() {
   this.getDocuments();
  /*  this.menuAccessList = JSON.parse(sessionStorage.getItem("menuacess"));
    await this.menuAccessList.forEach(obj=>{
      if(this.router.url  == obj)
        this.chckPapeAccess=true;
     });
     if(!this.chckPapeAccess)
     this.router.navigate(["/master/unathorize"]);*/
  }
  async getDocuments(){
    this.loading = true;
    await this.service.findAllDocuments().then((res: any) => {
      this.documentList= res;
      this.loading = false;
    },err=>{
      this.documentList=[];
     // alert(JSON.stringify(err.error));
      this.loading = false;
    });
  }
  async onSubmit(form: NgForm) {
    if (form.valid) {
      let docuent = new DocumentModel;
      docuent.documentID = form.value.documentID;
      docuent.documentName=form.value.documentName;
      docuent.activeStatus = 1;
      await this.service.saveDocumentDetails(docuent).then((msg: any)=>{
        this.loading = false;
        console.log(msg);
      
        this.toastr.success("add documents success fully", 'Document Master', {
          positionClass: 'toast-bottom-right'
        });
        form.reset();
      },err=>{
        this.toastr.error(err.error.message, 'Internal Error', {
          positionClass: 'toast-bottom-right'
        });
      });
      this.getDocuments();
  }
}
openDocumentModal(template: TemplateRef<any>, delCourseID) {
  this.deleteDocumentID=delCourseID;
  this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
}
decline(): void {
  this.modalRef.hide();
}
confirm(): void {
  this.deleteDocument();
  this.modalRef.hide();
}
async deleteDocument(){
  this.loading=true;
  this.service.deleteDocuments(this.deleteDocumentID).then((msg: any) => {
    this.loading = false;
    this.toastr.success(this.deleteDocumentID + ' has been  successfully', 'Delete Documents', {
      positionClass: 'toast-bottom-right'
    });
    this.getDocuments();
  }, err => {
    this.getDocuments();
    this.loading = false;
    this.toastr.error(err.msg, 'Internal Errors', {
      positionClass: 'toast-bottom-right'
    });
  });
}
}