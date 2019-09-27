import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SkillService } from '../../service/skill.service';
import { ToastrService } from 'ngx-toastr';
import { SkillMaster } from '../../model/skillmodel';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  title = 'materialApp';
  headerTitle = "Add Skill";
  slillName: string;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public loading = false;
  skillList: any;
  skillmodel: SkillMaster;
  p: number = 1;
  initialPageSize: number = 5;
  isShow: boolean = false;
  message: string;
  orderlevel:number;
  deletesklid: number;
  modalRef: BsModalRef;
  showDeleteModal :boolean=false;
  showEditModel :boolean=false;
  showViewModel :boolean=false;
  uporderlevel: number;
  upSkills: number;
  upCreatedDate: Date;
  updatedCreatedBy: string;
  updatedBY: string;
  updatedDate: string;
  updateskills: string;
  menuAccessList:any;
  chckPapeAccess:boolean=false;
  constructor(private skillService: SkillService, private toastr: ToastrService, private router: Router, private modalService: BsModalService) {
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
  async ngOnInit() {
    this.menuAccessList = JSON.parse(sessionStorage.getItem("menuacess"));
    await this.menuAccessList.forEach(obj=>{
      if(this.router.url  == obj)
        this.chckPapeAccess=true;
     });
     if(!this.chckPapeAccess)
     this.router.navigate(["/master/unathorize"]);
    console.log(this.router.url);
    this.getSkillList();
  }

  getSkillList() {
    this.loading = true;
    this.skillService.getAllSkillDetails().subscribe((msg: any) => {
      this.loading = false;
      console.log(msg);
      this.skillList = msg;

    }, err => {
      this.skillList = [];
      this.loading = false;
      console.log(err);
    });
  }
  openSkillsModal(template: TemplateRef<any>, skls, flag) {
    this.showDeleteModal=false;
    this.showEditModel=false;
    this.showViewModel=false;
    let modalClass;
    if (flag == 'D') {
      this.showDeleteModal=true;
      this.deletesklid = skls.skillID;
      this.message = skls.skillID + "-" + skls.skillName;
      modalClass = 'modal-sm';
    }else if(flag == 'V' || flag === 'E'){
      if (flag === 'E') {
        this.showEditModel = true;
        this.message = "Edit Skill: " + skls.skillID + "-" + skls.skillName;

      }
      else {
        this.showViewModel = true;
        this.message = "View Skill: " + skls.skillID + "-" + skls.skillName;
        this.updatedBY = skls.modifiedBy;
        this.updatedDate = skls.modifiedDate;
      }
      this.upSkills =  skls.skillID;
      this.uporderlevel = skls.orderlevl;
      this.upCreatedDate = skls.createdDate;
      this.updatedCreatedBy = skls.createdBy;
      this.updateskills = skls.skillName;
      modalClass = 'modal-lg';    
    }
    this.modalRef = this.modalService.show(template, { class: modalClass });
  }
  confirm(): void {
    this.deleteSkill();
    this.modalRef.hide();
  }
  closePopUP(){
    this.modalRef.hide();
  }
  deleteSkill() {
    this.loading=true;
    this.skillService.deleteSkills(this.deletesklid).subscribe((msg: any) => {
      this.getSkillList();
      this.loading = false;
      this.toastr.success(this.deletesklid + ' has been  successfully', 'Delete Skill', {
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
    let skillmsg;
    let skillid;
    if (form.valid) {
      this.skillmodel = new SkillMaster;
      if(pageFlag == 'I'){
        skillmsg = "Add Skill Element Successfully";
        this.skillmodel.createdBy = "Nasruddin";
        this.skillmodel.createdDate = new Date();
        this.skillmodel.orderlevl = form.value.orderlevel;
        this.skillmodel.skillName = form.value.slillName;
      }else{
        skillmsg = "Update Skill Element Successfully";
        this.skillmodel.skillID = this.upSkills;
        this.skillmodel.modifiedBy = "Nasruddin";
        this.skillmodel.modifiedDate = new Date();
        this.skillmodel.orderlevl = this.uporderlevel;
        this.skillmodel.createdBy = this.updatedCreatedBy;
        this.skillmodel.createdDate = this.upCreatedDate;
        this.skillmodel.skillName = this.updateskills;
        
      }
      this.skillmodel.activeStatus = 1;
     
      this.skillService.saveSkillDetail(this.skillmodel).subscribe((msg: any) => {
        this.loading = false;
        console.log(msg);
        this.getSkillList();
        this.toastr.success(skillmsg, 'Skill Master', {
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
      this.initialPageSize = this.skillList.length;
    }
    // alert(this.searchResult.length)
  }

}
