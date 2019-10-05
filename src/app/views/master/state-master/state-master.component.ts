import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StateMaster } from '../../model/stateModel';
import { StateService} from '../../service/state.Service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.scss']
})
export class StateMasterComponent implements OnInit {
  title = 'materialApp';
  headerTitle = "Add States";
  stateName: string;
  countryCode:string='IND';
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public loading = false;
  stateList: any;
  stateModel: StateMaster;
  p: number = 1;
  initialPageSize: number = 5;
  isShow: boolean = false;
  message: string;
  deletestateid: number;
  modalRef: BsModalRef;
  showDeleteModal :boolean=false;
  showEditModel :boolean=false;
  showViewModel :boolean=false;
  upcountryCode: string;
  upStates: number;
  upCreatedDate: Date;
  updatedCreatedBy: string;
  updatedBY: string;
  updatedDate: string;
  updatestates: string;
  constructor(private stateService: StateService, private toastr: ToastrService, private router: Router, private modalService: BsModalService) {
    //  this.loadStates();
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

  ngOnInit() {
    this.getStateList();
  }
  getStateList() {
    this.loading = true;
    this.stateService.getAllStateDetails().subscribe((msg: any) => {
      this.loading = false;
      console.log(msg);
      this.stateList = msg;

    }, err => {
      this.stateList = [];
      this.loading = false;
      console.log(err);
    });
  }

  openStatesModal(template: TemplateRef<any>, stt, flag) {
    this.showDeleteModal=false;
    this.showEditModel=false;
    this.showViewModel=false;
    let modalClass;
    if (flag == 'D') {
      this.showDeleteModal=true;
      this.deletestateid = stt.stateID;
      this.message = stt.stateID + "-" + stt.stateName;
      modalClass = 'modal-sm';
    }else if(flag == 'V' || flag === 'E'){
      if (flag === 'E') {
        this.showEditModel = true;
        this.message = "Edit State: " + stt.stateID + "-" + stt.stateName;

      }
      else {
        this.showViewModel = true;
        this.message = "View State: " + stt.stateID + "-" + stt.stateName;
        this.updatedBY = stt.modifiedBy;
        this.updatedDate = stt.modifiedDate;
      }
      this.upStates =  stt.stateID;
      this.upcountryCode = stt.countryCode;
      this.upCreatedDate = stt.createdDate;
      this.updatedCreatedBy = stt.createdBy;
      this.updatestates = stt.stateName;
      modalClass = 'modal-lg';    
    }
    this.modalRef = this.modalService.show(template, { class: modalClass });
  }
  confirm(): void {
    this.deleteState()
    this.modalRef.hide();
  }
  closePopUP(){
    this.modalRef.hide();
  }
  deleteState() {
    this.loading=true;
    this.stateService.deleteState(this.deletestateid).subscribe((msg: any) => {
      this.getStateList();
      this.loading = false;
      this.toastr.success(this.deletestateid + ' has been  successfully', 'Delete State', {
        positionClass: 'toast-bottom-right'
      });
    }, err => {
  
      this.loading = false;
      this.toastr.error(err.msg, 'Internal Errors', {
        positionClass: 'toast-bottom-right'
      });
    });
  }
  decline(): void {
    this.modalRef.hide();
  }
  onSubmit(form: NgForm, pageFlag) {
    let statemsg;
    let stateid;
    if (form.valid) {
      this.stateModel = new StateMaster;
      if(pageFlag == 'I'){
        statemsg = "Add State Element Successfully";
        this.stateModel.createdBy = sessionStorage.getItem('username');
        this.stateModel.createdDate = new Date();
       // alert(form.value.countryCode);
        this.stateModel.countryCode = form.value.countryCode;
        this.stateModel.stateName = form.value.stateName;
      }else{
        alert(sessionStorage.getItem('username'));
        statemsg = "Update State Successfully";
        this.stateModel.stateID = this.upStates;
        this.stateModel.modifiedBy =  sessionStorage.getItem('username');
        this.stateModel.modifiedDate = new Date();
        this.stateModel.countryCode = this.upcountryCode;
        this.stateModel.createdBy = this.updatedCreatedBy;
        this.stateModel.createdDate = this.upCreatedDate;
        this.stateModel.stateName = this.updatestates;
        
      }
      this.stateModel.activeStatus = 1;
     alert(JSON.stringify(this.stateModel));
      this.stateService.saveStateDetails(this.stateModel).subscribe((msg: any) => {
        this.loading = false;
        console.log(msg);
        this.getStateList();
        this.toastr.success(statemsg, 'State Master', {
          positionClass: 'toast-bottom-right'
        });
      
        if (pageFlag === 'U')
        this.closePopUP();
      }, err => {
        this.loading = false;
        if (pageFlag === 'U')
        this.closePopUP();
        this.toastr.error(err.error.message, 'Internal Error', {
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/master/error']);
        console.log(err);
      });
      // console.log(JSON.stringify(this.skillmodel));
      // ...our form is valid, we can submit the data
      form.reset();
    }
  }
  showAll(event: any) {
    //alert(event.target.value)
    if (event.target.value == 5) {
      this.isShow = false;
      this.initialPageSize = event.target.value;
      this.p = 1;
    } else {
      this.isShow = true;
      this.initialPageSize = this.stateList.length;
    }
    // alert(this.searchResult.length)
  }

}
