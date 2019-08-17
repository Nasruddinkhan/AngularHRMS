import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../service/must-match.validator';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */

@Component({
    selector: 'app-dashboard',
    templateUrl: 'register.component.html',
    styleUrls:['./register.component.css']
  })
  export class RegisterComponent implements OnInit {
    regForm: FormGroup;
    isSubmitted  =  false;
    constructor(private  formBuilder:FormBuilder){

    }
    public ngOnInit() {
      this.regForm  =  this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        cnfpassword: ['', Validators.required]
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
      alert('form valid');
    }
     
  }