import { Component, OnInit, TemplateRef } from '@angular/core';
import { SubMenuService } from '../../service/sub-menu.service';
import { MenuService } from '../../service/menu.service';
import { ToastrService } from 'ngx-toastr';
import { SubMenus } from '../../model/submenu.model';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { RolesService } from '../../service/roles.service';
import { Router } from '@angular/router';

/**
 * Created By, Nasruddin Khan
 * Created Date Sep 9, 2019 
 */
@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  headerTitle:string = 'Add Sub Menu';
  menuList:any;
  menuID:number;
  loading:boolean;
  submenu:SubMenus;
  modalRef: BsModalRef;
  deleteSubMenuID:string;
  subMenuList:any;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  searchText:string;
  p: number = 1;
  subMenuID:string;
  initialPageSize: number = 5;
  role:number;
  message:string;
  submenuname:string;
  roleList:any;
  menuAccessList:any;
  chckPapeAccess:boolean=false;
  constructor(private subMenuService:SubMenuService,
    private menuService: MenuService, private toastr:ToastrService,  
    private modalService: BsModalService,
    private roleService:RolesService, private router:Router) { }
  async ngOnInit() {
    
    this.menuAccessList = JSON.parse(sessionStorage.getItem("menuacess"));
    await this.menuAccessList.forEach(obj=>{
      if(this.router.url  == obj)
        this.chckPapeAccess=true;
     });
     if(!this.chckPapeAccess)
     this.router.navigate(["/master/unathorize"]);
    this.getMenuList();
    this.getSubMenuList();
    this.getUserRole();
  }
  getUserRole(){
    this.roleService.getRolesDetails().subscribe((response:any)=>{
      this.roleList=response;
    });
  }
  confirm(): void {
    this.deleteSubMeu();
    this.modalRef.hide();
  }
   opensubmenuModal(template: TemplateRef<any>, menu){
     //alert(JSON.stringify(menu));
    this.deleteSubMenuID   = new String(menu.subMenuId).replace("/","-").replace("/","-");
    alert( this.deleteSubMenuID);
    this.message =   menu.subMenuName;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  deleteSubMeu(){
    this.loading=true;
    this.subMenuService.deleteSubMenus(this.deleteSubMenuID).subscribe((msg: any) => {
      this.getSubMenuList();
      this.loading = false;
      this.toastr.success(this.message + ' has been  successfully', 'Delete Sub Menu', {
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
  getSubMenuList(){
    this.loading = true;
    this.subMenuService.getSubMenuDetails().subscribe((response:any)=>{
      this.subMenuList = response;
      this.loading = false;
    },err=>{
      this.loading = false;
    });
  }
  getMenuList(){
    this.menuService.getMenuDetails().subscribe((response:any)=>{
      this.menuList = response;
    },err=>{
      this.toastr.error('menus is not declare please first add menu list', 'Menus', {
        positionClass: 'toast-bottom-right'
      });
    });
  }
  collapsed(event: any): void {
    // console.log(event);
  }
  expanded(event: any): void {
    // console.log(event);
  }
  
  onSubmit(form: NgForm) {
    let msg;
    let menuId;
    if (form.valid) {
      this.loading = true;
      this.submenu = new SubMenus;
  
        msg = "Add Sub Menu Successfully";
      this.submenu.subMenuId = form.value.subMenuID;
      this.submenu.subMenuName = form.value.submenuname;
        this.submenu.createdBy = "Nasruddin";
        this.submenu.createdDate = new Date();
        menuId = this.menuID;
        this.submenu.activeStatus = 1;
        this.role=form.value.role


      this.subMenuService.saveSubMenuDetails(menuId, this.submenu,  this.role).subscribe((response: any) => {
        this.loading = false;
       this.getSubMenuList();
        this.toastr.success(msg, 'Sub Menu Details', {
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
  }
}
