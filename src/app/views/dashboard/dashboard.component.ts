import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
   let user = JSON.parse(sessionStorage.getItem("user"));
   if(user.isPersonalFlag === 'N'){
   
   }
  }
 
}
