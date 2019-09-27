import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StatusMaster } from '../../model/status.model';
import { AppStatusService } from '../../service/app-status.service';


@Component({
  selector: 'app-app-status',
  templateUrl: './app-status.component.html',
  styleUrls: ['./app-status.component.scss']
})
export class AppStatusComponent implements OnInit {
  statusList:any;
  headerTitle="Add status";
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public loading = false;
  p: number = 1;
  initialPageSize: number = 5;
  isShow: boolean = false;
  modalRef: BsModalRef;
  message: string;
  statusname : string;
  statusId: string;
  statmodel:StatusMaster;
  deleteStateID:string;
  menuAccessList:any;
  chckPapeAccess:boolean=false;
  constructor(private toastr: ToastrService, private router: Router, 
    private statusService: AppStatusService,
    private modalService: BsModalService) { }

 async ngOnInit() { 
     this.menuAccessList = JSON.parse(sessionStorage.getItem("menuacess"));
    await this.menuAccessList.forEach(obj=>{
      if(this.router.url  == obj)
        this.chckPapeAccess=true;
     });
     if(!this.chckPapeAccess)
     this.router.navigate(["/master/unathorize"]);
     this.getStatusList();
  }
  getStatusList(){
    this.loading = true;
    this.statusService.getStatusDetails().subscribe((msg: any) => {
      this.loading = false;
      console.log(msg);
      this.statusList = msg;
    }, err => {
      this.statusList = [];
      this.loading = false;
      console.log(err);
    });
  }
  collapsed(event: any): void {
    // console.log(event);
  }
  expanded(event: any): void {
    // console.log(event);
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  onSubmit(newstatusForm:NgForm){
    if (newstatusForm.valid) {
      //alert("valid forms");
      let statMsg = "Add status Successfully";
      
       this.statmodel = new StatusMaster;
       this.statmodel.createdBy="Nasruddin khan";
       this.statmodel.statusID =  (newstatusForm.value.statusId).toUpperCase();
       this.statmodel.statusName= newstatusForm.value.statusname;
       this.statmodel.createdDate = new Date();
       this.statmodel.modifiedDate= new Date();
       this.statmodel.modifiedBy="Nasruddin khan";
       this.statmodel.activeStatus = 1;
       this.loading = true;
       this.statusService.saveStatusDetail(this.statmodel).subscribe((respone:any)=>{
        this.loading = false;
        this.getStatusList();
        newstatusForm.reset();
        this.toastr.success(statMsg, 'Success', {
          positionClass: 'toast-bottom-right'
        });
       }, err=>{
        this.loading = false;
        this.toastr.error(err.error.message, 'Internal Errors', {
          positionClass: 'toast-bottom-right'
        });
       });

    }
  }
  openstatusModal (template: TemplateRef<any>, status){
    this.deleteStateID =status.statusID;
    this.message =   status.statusName;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.deleteStatus();
    this.modalRef.hide();
  }
  decline(){
    this.modalRef.hide();
  }
  deleteStatus(){
    this.loading=true;
    this.statusService.deleteStatus(this.deleteStateID).subscribe((msg: any) => {
      this.getStatusList();
      this.loading = false;
      this.toastr.success(this.message + 'has been successfully', 'Delete Skill', {
        positionClass: 'toast-bottom-right'
      });
    }, err => {
  
      this.loading = false;
      this.toastr.error(err.error.message, 'Internal Errors', {
        positionClass: 'toast-bottom-right'
      });
    });
  }
}
