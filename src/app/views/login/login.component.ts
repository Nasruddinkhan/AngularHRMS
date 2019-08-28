import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ LoginService } from '../service/login.service';
import { UserIdleService } from 'angular-user-idle';
/**
 * Created By NK5050747, Nasruddin Khan
 * Created Date Mar 12, 2019 
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
constructor(private router:Router, private loginService:LoginService){}
username:string;
password:string;
idle: number;
  timeout: number;
  ping: number;
  public loading = false;
  isSubmit=false;
  loginErrMsg:string;
  ngOnInit(): void {
    console.log("hi i'm logincomponent");
    if(null!==sessionStorage.getItem('token')){
      this.logoutUser();
    }
    
    
  }

  
  onSubmit(loginForm){
   this.isSubmit=true;
   this.loginErrMsg="";
    if(loginForm.invalid){
      return
    }
    let userObj={username:loginForm.value.username,password:loginForm.value.password}
     this.loading = true;
    this.loginService.loginUser(userObj).subscribe((loginUser:any)=>{
      let userObj=loginUser;
      sessionStorage.setItem('username',userObj.username); 
      sessionStorage.setItem('token',loginUser.token );
    
    
  
    this.loading = true;
      console.log('redirect properly');
     this.router.navigate(["/dashboard"]);


    },err=>{
      //alert("login failer ::: "+err.error.message);
      this.loading = false;
      this.loginErrMsg=err.error.message;
    })
    this.isSubmit=false;
  }
  logoutUser() {
    console.log("calling logoutUser ::::::::: ");
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
 
 
 }
