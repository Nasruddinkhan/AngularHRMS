import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../service/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'register.component.html',
    styleUrls:['./register.component.scss']
  })
  export class RegisterComponent implements OnInit {
    regForm: FormGroup;
    isSubmitted  =  false;
    public loading = false;
    constructor(private  formBuilder:FormBuilder, private userService:UserService, private toastr: ToastrService, private router: Router){

    }
    public ngOnInit() {
      this.regForm  =  this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        cnfpassword: ['', Validators.required],
        userType:['FTL'],
        activeStatus:[1]
    },{
      validator: MustMatch('password', 'cnfpassword')
  }
    );
    }
    get formControls() { return this.regForm.controls; }
    register(){
      this.isSubmitted = true;
      if(this.regForm.invalid){
        return;
      }
     this.loading = true;
      this.userService.registerUser(JSON.stringify(this.regForm.value)).subscribe((response:any)=>{
        this.loading = false;
        let msg="successfully please check email";
        this.toastr.success(msg, 'Registration', {
          positionClass: 'toast-bottom-right'
        });
        this.regForm.reset();
        this.router.navigate(['/']);
      },err => {
        this.loading = false;
        this.toastr.error(err.error.message, 'Internal Errors', {
          positionClass: 'toast-bottom-right'
        });
      });
    }
     
  }