import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { UserdocumentService } from '../../service/userdocument.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-application',
  templateUrl: './preview-application.component.html',
  styleUrls: ['./preview-application.component.scss']
})
export class PreviewApplicationComponent implements OnInit {
  userid: number;
  userBean: any;
  firstName: string;
  lastName: string;
  guardian: string;
  fatherName: string;
  educationLsit = [];
  loading: boolean = false;
  dob: string;
  doj: string;
  maritial: string;
  gender: string;
  contactno: string;
  email: string;
  isPersonalFlag: string;
  refererName: string;
  refererEmail: string;
  refererContact: string;
  country: string;
  state: string;
  pinCode: string;
  city: string;
  address: string;
  encodeImg="data:image/jpg;base64, ";
  response:any;
  constructor(private sanitizer:DomSanitizer,private userDocService: UserdocumentService, private route: Router, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.userid = user.userID;
    this.getApplicationData();
  }

  editPersonalDetails() {
    this.hideModal();
    this.route.navigate(['/user/personal']);
  }
  hideModal() {
    this.bsModalRef.hide();
  }
  editEducationDetails() {
    this.hideModal();
    this.route.navigate(['/user/education']);
  }

  getApplicationData() {
    this.loading = true;
    this.userDocService.getApplicationData(this.userid).then((res: any) => {
      this.response = res;
      this.loading = false;
      this.educationLsit = res.applicationBean;
      this.firstName = res.userBean.firstName;
      this.lastName = res.userBean.lastName;
      this.guardian = res.userBean.guardian
      this.fatherName = res.userBean.fatherName;
      this.dob = res.userBean.dob;
      this.doj = res.userBean.doj;
      this.maritial = res.userBean.maritial;
      this.gender = res.userBean.gender;
      this.contactno = res.userBean.contactno;
      this.email = res.userBean.email;
      this.isPersonalFlag = res.userBean.isPersonalFlag;
      this.refererName = res.userBean.refererName;
      this.refererEmail = res.userBean.refererEmail;
      this.refererContact = res.userBean.refererContact;
      this.country =  res.addressBean.country; 
      this.state   =  res.addressBean.state;   
      this.pinCode =  res.addressBean.pinCode; 
      this.city    =  res.addressBean.city;    
      this.address =  res.addressBean.address; 
      this.encodeImg+=res.encodePhoto;
    });
  }
  getJsoftApplication(){
    this.loading=true;
    this.userDocService.getJsoftApplication(this.userid, JSON.stringify(this.response)).then((res: any) =>{
    this.loading=false;
    this.hideModal();
    let encodeStr =res;
    /*var iframe = "<iframe width='100%' height='100%' src='data:application/pdf;base64," + encodeStr.encode + "'></iframe>"
    var x = window.open("jsoftappicationForm.pdf", "viewer");
    x.document.open();
    x.document.write(iframe);
    x.document.close();*/

    let fileName = this.userid + "_application";
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/pdf;base64,' +  encodeStr.encode);
    element.setAttribute('download', fileName);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); 

    },err=>{
      
      this.loading=false;
    });
  }

  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.encodeImg);
}
}
