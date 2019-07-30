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
constructor(private router:Router, private loginService:LoginService,
  private userIdle: UserIdleService){}
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
    if(null!==localStorage.getItem('token')){
      this.logoutUser();
    }
    this.idle = this.userIdle.getConfigValue().idle;
    this.timeout = this.userIdle.getConfigValue().timeout;
    this.ping = this.userIdle.getConfigValue().ping;
    this.userIdle.setConfigValues({
      idle: this.idle,
      timeout: this.timeout,
      ping: this.ping
    });
    
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
      localStorage.setItem('token',userObj.token);
      
         //Start watching for user inactivity.
    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      console.log('Time is up!')
     
      this.logoutUser();
      
    });
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
    this.stopWatching();
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  stop() {
    console.log("stop")
    this.userIdle.stopTimer();
  }
 
  stopWatching() {
    console.log("stopWatching")
    this.userIdle.stopWatching();
  }
 
  startWatching() {
    console.log("startWatching")
    this.userIdle.startWatching();
  }
 
  restart() {
    console.log("restart")
    this.userIdle.resetTimer();
  }
 }
