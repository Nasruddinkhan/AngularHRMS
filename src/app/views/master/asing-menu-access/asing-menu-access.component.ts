import { Component, OnInit } from '@angular/core';
import { AsingMenuService } from '../../service/asing-menu.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-asing-menu-access',
  templateUrl: './asing-menu-access.component.html',
  styleUrls: ['./asing-menu-access.component.scss']
})
export class AsingMenuAccessComponent implements OnInit {

  constructor(private service:AsingMenuService) { }
 userList:any;
 menuList:any;
 loading:false;
 menuID:string;
 employeeId:number;
 headerTitle ="Asing menu";
  ngOnInit() {
    this.getDropDownData();
  }
  async getDropDownData(){
   this.service.getOnloadDropdowns().then((response:any)=>{
   this.userList =  response.userList;
   this.menuList =  response.menuList;
    
   });
   
  }
  onSubmit(form:NgForm){
    
  }
}
