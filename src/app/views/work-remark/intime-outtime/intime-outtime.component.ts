import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Component({
  selector: 'app-intime-outtime',
  templateUrl: './intime-outtime.component.html',
  styleUrls: ['./intime-outtime.component.scss']
})
export class IntimeOuttimeComponent implements OnInit {

  constructor(private userService:UserService) { }
  userid:number;
  attendentList=[];
  pageNo = 1;
  bigTotalItems: number;

  numPages: number = 0;
  maxSize: number = 5;
  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.userid = user.userID;
    this.findInOutTime();
  }
  pageChanged(event: any): void {
    this.pageNo = event.page;
    this.findInOutTime();
  }
 
  findInOutTime(){
    this.userService.findInOutTime(this.userid,this.pageNo).subscribe((res:any)=>{
      this.attendentList=res.content;
     this.bigTotalItems = res.totalElements;
 
    });
  }
}
