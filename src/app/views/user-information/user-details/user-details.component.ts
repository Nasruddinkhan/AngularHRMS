import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private formBuiler:FormBuilder) { }

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
      pancard:['',[Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]]
    });
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
    alert(JSON.stringify(this.userForm.value ));
    this.userForm.reset(); 
  }
 
}
