import { Component, OnInit } from '@angular/core';
import { AsingMenuService } from '../../service/asing-menu.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asing-menu-access',
  templateUrl: './asing-menu-access.component.html',
  styleUrls: ['./asing-menu-access.component.scss']
})
export class AsingMenuAccessComponent implements OnInit {

  constructor(private service:AsingMenuService, private router:Router) { }
 userList:any;
 menuList:any;
 loading:false;
 menuID:string;
 employeeId:number;
 headerTitle ="Asing menu";
 menuAccessList:any;
    chckPapeAccess:boolean=false;
  async ngOnInit() {
    
    this.menuAccessList = JSON.parse(sessionStorage.getItem("menuacess"));
    await this.menuAccessList.forEach(obj=>{
      if(this.router.url  == obj)
        this.chckPapeAccess=true;
     });
     if(!this.chckPapeAccess)
     this.router.navigate(["/master/unathorize"]);
  
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
