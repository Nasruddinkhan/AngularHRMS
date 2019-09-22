import { Component, OnInit } from '@angular/core';
import { SearchEmployeesService } from '../../service/search-employees.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { ApprovedModalComponent } from './search-modal-component';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.scss']
})
export class SearchEmployeesComponent implements OnInit {
  public search: any;
  bsModalRef: BsModalRef;
  searchDrop: any;
  searchList:any;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  loading :boolean= false;
  searchText :string;
  p: number = 1;
  initialPageSize: number = 5;
  constructor(private serachEmpService:SearchEmployeesService, private modalService: BsModalService) { }
  ngOnInit() {
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
  searchEmployee(){
    this.loading= true;
    this.serachEmpService.findAllUser().subscribe((response:any)=>{
      this.searchList = response;
      this.loading=false;
     //console.log(JSON.stringify(response));
    },err=>{
      this.loading=false;
    });
  }
  openApproveModalComponent(emp) {
    const initialState = {
      title: 'Approved Status Details',
      email:emp.email
    };

    this.bsModalRef = this.modalService.show(ApprovedModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
