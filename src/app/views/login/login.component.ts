import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ LoginService } from '../service/login.service';
import { UserIdleService } from 'angular-user-idle';
import { ToastrService } from 'ngx-toastr';

/**
 * Created By NK5050747, Nasruddin Khan
 * Created Date Mar 12, 2019 
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
constructor(private router:Router, private loginService:LoginService, private toastr: ToastrService){}
username:string;
password:string;

idle: number;
  timeout: number;
  ping: number;
  public loading = false;
  isSubmit=false;
  menuArr = new Array<String>();
  ngOnInit(): void {
    console.log("hi i'm logincomponent");
    if(null!==sessionStorage.getItem('token')){
      this.logoutUser();
    }
  }

  register(){
    this.router.navigate(["/register"]);
  }
  async onSubmit(loginForm){
   this.isSubmit=true;
    if(loginForm.invalid){
      return
    }
    let userObj={username:loginForm.value.username,password:loginForm.value.password}
     this.loading = true;
     this.loginService.loginUser(userObj).then((loginUser:any)=>{
      let userObj=loginUser;
      sessionStorage.setItem('username',userObj.user.firstName); 
      sessionStorage.setItem('token',userObj.token); 
      sessionStorage.setItem('user',JSON.stringify(loginUser.user));
      loginUser.map.menus.forEach(element => {
        this.menuArr.push(element.id);
      });
      sessionStorage.setItem('menuacess',JSON.stringify( this.menuArr));
      this.loading = false;
     // alert(JSON.stringify(loginUser.user));
      if(loginUser.errorCode==205){
        this.router.navigate(["/changepassword"]);
      }else{
        this.router.navigate(["/dashboard"]);
      }
    },err=>{
      //alert("login failer ::: "+err.error.message);
      this.loading = false;
    // alert(typeof err.error.message == 'undefined');
     if(typeof err.error.message == 'undefined'){
      this.toastr.error('Please run your server side code', 'Backend not working', {
        positionClass: 'toast-bottom-right'
      });
     }else{
      this.toastr.error(err.error.message, 'Internal Errors', {
        positionClass: 'toast-bottom-right'
      });
    }
    })
    this.isSubmit=false;
  }
  logoutUser() {
    console.log("calling logoutUser ::::::::: ");
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  } 
 }
