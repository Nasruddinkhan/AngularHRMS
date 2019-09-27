import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Component({
  selector: 'app-upload-master',
  templateUrl: './upload-master.component.html',
  styleUrls: ['./upload-master.component.scss']
})
export class UploadMasterComponent implements OnInit {
  menuAccessList:any;
    chckPapeAccess:boolean=false;
  constructor(private router:Router) { }

  async ngOnInit() {
    this.menuAccessList = JSON.parse(sessionStorage.getItem("menuacess"));
    await this.menuAccessList.forEach(obj=>{
      if(this.router.url  == obj)
        this.chckPapeAccess=true;
     });
     if(!this.chckPapeAccess)
     this.router.navigate(["/master/unathorize"]);
  }

}
