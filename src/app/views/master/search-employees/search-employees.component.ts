import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { SearchEmployeesService } from '../../service/search-employees.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { RolesService } from '../../service/roles.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.scss']
})
export class SearchEmployeesComponent implements OnInit {
  public search: any;
  bsModalRef: BsModalRef;
  searchDrop: any;
  searchList: any;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  loading: boolean = false;
  searchText: string;
  p: number = 1;
  initialPageSize: number = 5;
  email: string;
  roleList: any;
  role: string;
  status: string = 'Approved';
  statusID: string = 'APP';
  closeBtnName: string;
  menuAccessList:any;
  marginTop:string="8%";
  searchLabel:boolean=false;
  chckPapeAccess:boolean=false;
  constructor(private serachEmpService: SearchEmployeesService, private toastr: ToastrService,
    private modalService: BsModalService, private roleService: RolesService, private router:Router) { }
  async ngOnInit() {
     this.menuAccessList = JSON.parse(sessionStorage.getItem("menuacess"));
     await this.menuAccessList.forEach(obj=>{
       if(this.router.url  == obj)
         this.chckPapeAccess=true;
      });
      if(!this.chckPapeAccess)
      this.router.navigate(["/master/unathorize"]);
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
  searchEmployee() {
    this.loading = true;
    this.serachEmpService.findAllUser().subscribe((response: any) => {
      this.searchList = response;
      this.loading = false;
      this.marginTop="";
      this.searchLabel = true;

      //console.log(JSON.stringify(response));
    }, err => {
      this.loading = false;
    });
  }

  openApproveModalComponent(template: TemplateRef<any>, emp) {
    this.email = emp.email;
     this.getRolesDetails();
    this.bsModalRef = this.modalService.show( template,{class: 'modal-lg' });

  }
  getRolesDetails() {
    this.loading = true;
    this.roleService.getRolesDetails().subscribe((respose: any) => {
      this.roleList = respose;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  getMarginTop(){
    return this.marginTop;
  }
  onApproveSubmit(form: NgForm) {
   this.loading = true;
    this.serachEmpService.userApprovedStatus(this.email,this.statusID,
      'nasruddinkhan44@gmail.com',form.value.role).subscribe((response:any)=>{
        this.bsModalRef.hide();
        this.loading = false;
        this.toastr.success(response.errorMessage, 'Approved', {
          positionClass: 'toast-bottom-right'
        });
        this.searchEmployee();
      },err=>{
        this.loading = false;
        this.toastr.error(err.error.message, 'Internal Errors', {
          positionClass: 'toast-bottom-right'
        });
      });
  }
}
