import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from '../service/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-chgpassword',
  templateUrl: './chgpassword.component.html',
  styleUrls: ['./chgpassword.component.scss']
})
export class ChgpasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isSubmitted  =  false;
  public loading = false;
  userType : string = "UL";
  email:string;
  constructor(private  formBuilder:FormBuilder, private toastr: ToastrService, private router: Router, private userService:UserService){}
  public ngOnInit() {
      this.changePasswordForm  =  this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required, Validators.minLength(8),
          Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
   ]],
        cnfpassword: ['', Validators.required]
    },{
      validator: MustMatch('password', 'cnfpassword')
  }
    );

    var user = JSON.parse(sessionStorage.user);
    alert(user.email);
    if(null == user){
      this.router.navigate(['/']);
    }else{
     //let email = user['email'];
     this.email = user.email;
     this.changePasswordForm.patchValue({
      email:this.email
     });  
     this.changePasswordForm.get('email').disable();
     //alert(email);
    }

    }
    get formControls() { return this.changePasswordForm.controls; }
    cangePassword(){
      this.isSubmitted = true;
      if(this.changePasswordForm.invalid){
        return;
      }
      alert(this.email +"| "+this.changePasswordForm.value.password);
      this.loading = true;
      this.userService.changePassword(this.email, this.changePasswordForm.value.password, this.userType).subscribe((response:any)=>{
        this.loading = false;
        let msg="change password successfully please check email";
        this.toastr.success(msg, 'Registration', {
          positionClass: 'toast-bottom-right'
        });
        this.email="";
        this.changePasswordForm.reset();
        this.router.navigate(['/']);
      },err => {
        this.loading = false;
        this.toastr.error(err.error.message, 'Internal Errors', {
          positionClass: 'toast-bottom-right'
        });
      });
    }

}
