import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../../service/menu.service';
import { Menus } from '../../model/menus.model';
import { NgForm } from '@angular/forms';

/**
 * Created By, Nasruddin Khan
 * Created Date Sep 9, 2019 
 */
@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.scss']
})
export class MenuMasterComponent implements OnInit {
  headerTitle:string='Add Menu';
  menuname:string;
  menuList:any;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public loading = false;
  menu:Menus;
  searchText:string;
  p: number = 1;
  initialPageSize: number = 5;
  isShow: boolean = false;
  deleteMenuID:number;
  modalRef: BsModalRef;
  message: string;
  constructor(private menuService: MenuService,private toastr: ToastrService, private router: Router, private modalService: BsModalService) { }

  
  ngOnInit() {
    this.getMenuList();
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
  getMenuList(){
    this.loading = true;
    this.menuService.getMenuDetails().subscribe((msg: any) => {
      this.loading = false;
      console.log(msg);
      this.menuList = msg;

    }, err => {
      this.menuList = [];
      this.loading = false;
      console.log(err);
    });
  }
  openmenuModal(template: TemplateRef<any>, menu){
    this.deleteMenuID =menu.menuID;
    this.message =   menu.menuName;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.deleteRole();
    this.modalRef.hide();
  }
  deleteRole(){
    this.loading=true;
    this.menuService.deleteMenus(this.deleteMenuID).subscribe((msg: any) => {
      this.getMenuList();
      this.loading = false;
      this.toastr.success(this.message + ' has been  successfully', 'Delete Menu', {
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
       this.menu = new Menus;
       let menuMsg = "Add menu Successfully";
       this.menu.createdBy="Nasruddin khan";
       this.menu.menuName=form.value.menuname;
      this.menu.activeStatus = 1;
      this.menu.createdDate = new Date();
     this.loading = true;
      this.menuService.saveMenuDetail(this.menu).subscribe((msg: any) => {
        this.loading = false;
        console.log(msg);
        this.getMenuList();
        this.toastr.success(menuMsg, 'Menu', {
          positionClass: 'toast-bottom-right'
        });
      }, err => {
        this.loading = false;
        
        if(err.status==400){
          this.toastr.error(err.error.menuName, 'Validation Errors', {
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
