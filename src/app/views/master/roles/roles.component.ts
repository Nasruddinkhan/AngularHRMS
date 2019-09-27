import { Component, OnInit, TemplateRef } from '@angular/core';
import { RolesService } from '../../service/roles.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../../model/roles.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  headerTitle:string="Add role";
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  rolename:string;
  roleList: any;
  role:Roles;
  deleteRoleID :number;
  public loading = false;
  p: number = 1;
  initialPageSize: number = 5;
  isShow: boolean = false;
  modalRef: BsModalRef;
  message: string;
  menuAccessList:any;
  chckPapeAccess:boolean=false;
  constructor(private roleService:RolesService, private toastr: ToastrService, private router: Router, private modalService: BsModalService) { }

  async ngOnInit() {
    this.menuAccessList = JSON.parse(sessionStorage.getItem("menuacess"));
    await this.menuAccessList.forEach(obj=>{
      if(this.router.url  == obj)
        this.chckPapeAccess=true;
     });
     if(!this.chckPapeAccess)
     this.router.navigate(["/master/unathorize"]);
     this.getRoleList();
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
  getRoleList(){
    this.loading = true;
    this.roleService.getRolesDetails().subscribe((msg: any) => {
      this.loading = false;
      console.log(msg);
      this.roleList = msg;

    }, err => {
      this.roleList = [];
      this.loading = false;
      console.log(err);
    });
  }
  openRoleModal(template: TemplateRef<any>, rol){
    this.deleteRoleID =rol.roleID;
    this.message =   rol.roleName;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.deleteRole();
    this.modalRef.hide();
  }
  deleteRole(){
    this.loading=true;
    this.roleService.deleteRoles(this.deleteRoleID).subscribe((msg: any) => {
      this.getRoleList();
      this.loading = false;
      this.toastr.success(this.deleteRoleID + ' has been  successfully', 'Delete Skill', {
        positionClass: 'toast-bottom-right'
      });
    }, err => {
  
      this.loading = false;
      this.toastr.error(err.error.message, 'Internal Errors', {
        positionClass: 'toast-bottom-right'
      });
    });
  }
  decline(){
    this.modalRef.hide();
  }
  onSubmit(form: NgForm) {
    
    if (form.valid) {
      this.role = new Roles;
       let roleMsg = "Add Role Successfully";
       this.role.createdBy="Nasruddin khan";
       this.role.roleName=form.value.rolename;
      this.role.activeStatus = 1;
      this.role.createdDate = new Date();
     this.loading = true;
      this.roleService.saveRoleDetail(this.role).subscribe((msg: any) => {
        this.loading = false;
        console.log(msg);
        this.getRoleList();
        this.toastr.success(roleMsg, 'Skill Master', {
          positionClass: 'toast-bottom-right'
        });
      }, err => {
        this.loading = false;
        
        if(err.status==400){
          this.toastr.error(err.error.roleName, 'Validation Errors', {
            positionClass: 'toast-bottom-right'
          });
        }else{
        this.toastr.error(err.error.message, 'Internal Errors', {
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/master/error']);
        console.log(err);
      }
    });
     
      form.reset();
    }
  }
}
