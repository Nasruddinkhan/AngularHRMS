import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  headerTitle:string="Personal Details";
  addheaderTitle:string="Address Details";
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  isCollapsed1: boolean = false;
  iconCollapse1: string = 'icon-arrow-up';
  userForm:FormGroup;
  isSubmitted  =  false;
  loading:boolean=false;
  constructor(private formBuiler:FormBuilder, private userService: UserService, private toastr:ToastrService, public datepipe: DatePipe) { }
  editEmplyeess(){
    var user = JSON.parse(sessionStorage.getItem("user"));
    alert(user.isPersonalFlag==null || user.isPersonalFlag==='N');
    
     alert(this.datepipe.transform(user.dob, 'yyyy-MM-dd'));
    this.userForm.setValue({  
      firstName:user.firstName,
      lastName: user.lastName,
      fatherName:user.fatherName,
      gender:user.gender,
      dob: this.datepipe.transform(user.dob, 'yyyy-MM-dd'),
      maritial:user.maritialStatus,
      doj: this.datepipe.transform(user.doj, 'yyyy-MM-dd'),
      email:user.email,
      contactno:user.contactNo,
      guardian:user.gurdianContactNo,
      aadhaarno:user.aadhaarDetails,
      pancard:user.panCard,
      isPersonalFlag:'Y'
  }); 
  }
  ngOnInit() {
   
    this.userForm = this.formBuiler.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      fatherName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      gender:['', Validators.required],
      dob:['', Validators.required],
      maritial:['', Validators.required],
      doj:['', Validators.required],
      email:['', ],
      contactno:['', Validators.required],
      guardian:['', Validators.required],
      aadhaarno:['', [ Validators.minLength(12)]],
      isPersonalFlag:['Y',],
      pancard:['',[Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]]
    });
    this.editEmplyeess();
    
  }
  //^[A-Za-z]{5}[0-9]{4}[A-Za-z]$
  get formControls() { return this.userForm.controls; }
  collapsed(event: any): void {
    // console.log(event);
  }
  expanded(event: any): void {
    // console.log(event);
  }
  toggleCollapse(flag): void {
  if(flag=='P'){
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }else{
    this.isCollapsed1 = !this.isCollapsed1;
    this.iconCollapse1 = this.isCollapsed1 ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  }
  userRegister(){
    this.isSubmitted = true;
    if(this.userForm.invalid){
      return;
    }
    //alert(JSON.stringify(this.userForm.value ));
   this.loading =true;
   this.userService.savePersonalDetails(JSON.stringify(this.userForm.value )).subscribe((response:any)=>{
    this.toastr.success("Update record successfully", 'SUCCESS', {
      positionClass: 'toast-bottom-right'
    });

    sessionStorage.setItem("user", JSON.stringify(response));

    this.loading =false;
    //this.userForm.reset(); 
    this.editEmplyeess();
   },err=>{
    this.toastr.error(err.error.message, 'Internal Errors', {
      positionClass: 'toast-bottom-right'
    });
    this.loading =false;
   });
  }
 
}
