import { Component, OnInit } from '@angular/core';
import { SearchEmployeesService } from '../../service/search-employees.service';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.scss']
})
export class SearchEmployeesComponent implements OnInit {
  public search: any;
  searchDrop: any;
  searchList:any;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  loading :boolean= false;
  searchText :string;
  p: number = 1;
  initialPageSize: number = 5;
  constructor(private serachEmpService:SearchEmployeesService) { }
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
}
