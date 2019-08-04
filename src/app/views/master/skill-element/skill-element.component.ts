import { Component, OnInit, TemplateRef } from '@angular/core';
import { SkillElementsMaster } from '../../model/skillelementmodel';
import { NgForm } from '@angular/forms';
import { SkillelementService } from '../../service/skillelement.service';

import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-skill-element',
  templateUrl: './skill-element.component.html',
  styleUrls: ['./skill-element.component.scss']
})
export class SkillElementComponent implements OnInit {
  headerTitle = "Add Skillemets";
  skillelement: SkillElementsMaster;
  orderlevel: number;
  slillelementName: string;
  skillId: number;
  skills: any[] = [];
  public loading = false;
  skillelements: any[] = [];
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  p: number = 1;
  initialPageSize: number = 5;
  modalRef: BsModalRef;
  message: string;
  deleteSklEleId: number;
  showDeleteModal :boolean=false;
  showEditModel :boolean=false;
  showModalclass:string;
  constructor(private sklelementSrvice: SkillelementService, private toastr: ToastrService, private modalService: BsModalService) { }
  ngOnInit() {
    this.getSkillsList();
    this.getSkillElementsDetails();
  }

  openModal(template: TemplateRef<any>, skillelements, page) {
    this.showDeleteModal=false;
    this.showEditModel=false;
    if (page === 'D') {
      this.showDeleteModal=true;
      this.deleteSklEleId = skillelements.skillElementID;
      this.message = skillelements.skillElementID + "-" + skillelements.skillElementName;
      this.showModalclass='modal-sm' ;
    }else if(page ==='E'){
      this.message = "Update Skill Ellemnts : "+skillelements.skillElementID + "-" + skillelements.skillElementName;
      this.showEditModel=true;
      this.showModalclass='modal-lg' ;
    }
    this.modalRef = this.modalService.show(template, { class:   this.showModalclass });
  }

  confirm(): void {
    this.deleteSkillElelents();
    this.modalRef.hide();
  }
  deleteSkillElelents() {
    this.sklelementSrvice.deleteSkillElements(this.deleteSklEleId).subscribe((msg: any) => {
      this.loading = false;
      this.toastr.success(this.deleteSklEleId + ' has been  Successfully', 'Delete Skill Elelements', {
        positionClass: 'toast-bottom-right'
      });
     
    }, err => {
      this.loading = false;
     // alert(JSON.stringify(err));
      this.toastr.error(err.error.message, 'Internal Errors', {
        positionClass: 'toast-bottom-right'
      });
      
    });
    this.getSkillElementsDetails();
  }

  decline(): void {
    this.modalRef.hide();
    this.toastr.warning('decline delete event', 'Skillelements', {
      positionClass: 'toast-bottom-right'
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
  getSkillElementsDetails() {
    this.loading = true;
    this.sklelementSrvice.getSkillElementsDetails().subscribe((skillelements: any) => {
      this.skillelements = skillelements;
      console.log(this.skillelements);
    }, err => {
      this.skillelements=[];
      console.log(err);
    });
    this.loading = false;
  }
  getSkillsList() {
    this.loading = true;
    this.sklelementSrvice.getSkillsList().subscribe((msg: any) => {
      this.loading = false;
      this.skills = msg;

      console.log(msg);
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }
  /*onSelect(event: TypeaheadMatch): void {
    alert(event );
    this.skillId = event.item.id;
    
  }*/
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.skillelement = new SkillElementsMaster;
      this.skillelement.activeStatus = 1;
      this.skillelement.createdBy = "Nasruddin";
      this.skillelement.createdDate = new Date();
      this.skillelement.skillElementName = form.value.slillelementName;
      this.skillelement.orderlevl = form.value.orderlevel;
      this.sklelementSrvice.saveSkillElementDetails(this.skillId, this.skillelement).subscribe((response: any) => {
        this.loading = false;
        this.getSkillElementsDetails();
        this.toastr.success('Add Skill Element Successfully', 'Skill Elelements', {
          positionClass: 'toast-bottom-right'
        });
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.message, 'Internal Errors', {
          positionClass: 'toast-bottom-right'
        });
      });
    }
    form.reset();
    // console.log(JSON.stringify(this.skillmodel));
    // ...our form is valid, we can submit the data
  }

}
