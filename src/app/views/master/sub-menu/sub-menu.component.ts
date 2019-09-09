import { Component, OnInit } from '@angular/core';
import { SubMenuService } from '../../service/sub-menu.service';
import { MenuService } from '../../service/menu.service';
import { ToastrService } from 'ngx-toastr';
import { SubMenus } from '../../model/submenu.model';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';

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
  upsubMenuId:string;
  upmenuID:string;
  updatedCreatedBy:string;
  upCreatedDate:Date;
  modalRef: BsModalRef;
  constructor(private subMenuService:SubMenuService,private menuService: MenuService, private toastr:ToastrService,  private modalService: BsModalService) { }
  ngOnInit() {
    this.getMenuList();
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
  closePopUP(): void {
    this.modalRef.hide();
  }
  onSubmit(form: NgForm, pageFlag) {
    let msg;
    let menuId;
    if (form.valid) {
      this.loading = true;
      this.submenu = new SubMenus;
      if (pageFlag === 'I') {
        msg = "Add Sub Menu Successfully";
      this.submenu.subMenuId = form.value.subMenuID;
      this.submenu.subMenuName = form.value.submenuname;
        this.submenu.createdBy = "Nasruddin";
        this.submenu.createdDate = new Date();
        menuId = this.menuID;
      } else {
        msg = "Update Sub menu Successfully";
        this.submenu.subMenuId = this.upsubMenuId;
        this.submenu.subMenuName = form.value.upsubmenunamre
        this.submenu.modifiedBy = "Nasruddin";
        this.submenu.modifiedDate = new Date();
        menuId = this.upmenuID;
        this.submenu.createdBy = this.updatedCreatedBy;
        this.submenu.createdDate = this.upCreatedDate;
      } 
      this.submenu.activeStatus = 1;



      this.subMenuService.saveSubMenuDetails(menuId, this.submenu).subscribe((response: any) => {
        this.loading = false;
      //  this.getSkillElementsDetails();
        this.toastr.success(msg, 'Sub Menu Details', {
          positionClass: 'toast-bottom-right'
        });
        if (pageFlag === 'U')
          this.closePopUP();

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
