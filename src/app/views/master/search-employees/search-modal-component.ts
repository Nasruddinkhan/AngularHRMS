import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { RolesService } from '../../service/roles.service';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'modal-content',
    template: `
    <div class="card">
    <div class="card-header">
               <i class="icon-people"></i>{{title}}
               
            </div>
            <form #approvedForm="ngForm" (ngSubmit)="onSubmit(approvedForm)">
        <div class="card-body">
        <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }" >
    </ngx-loading>
           <div class="row">
              <div class="form-group col-sm-12">
                  <label for="email">email id <span style="color:red">*</span></label>
                  <input type="text" maxlength="3"   minlength="3" class="form-control" [disabled]="true" required [(ngModel)]="email" name="email"
                    #email1="ngModel">
               </div>
            </div>
            <div class="row">
              <div class="form-group col-sm-12">
                  <label for="approve">Status <span style="color:red">*</span></label>
                  <input type="text" maxlength="3"   minlength="3" class="form-control" [disabled]="true" required [(ngModel)]="status" name="approve"
                    #approve1="ngModel">
               </div>
            </div>
            <div class="row">
            <div class="form-group col-sm-12">
            <label for="role">role <span style="color:red">*</span></label>
            <select required [(ngModel)]="skillId" typeaheadOptionField="code" name="role"
              [ngClass]="{'red-border-class': !role1.valid && role1.touched}" #role1="ngModel"
              class="form-control">
              <option value="">Select skill</option>
              <option *ngFor="let role of roleList" [value]="role.roleID">{{role.roleName}}</option>
            </select>
            <div *ngIf="!role1.valid && role1.touched" style="color:red">
              role is required
            </div>
            </div>
            
            </div>
        </div>
        <div class="card-footer">
           <button type="submit" class="btn btn-primary" [disabled]="!approvedForm.form.valid">Submit</button>
        </div>
     </form>
</div>
  `
})
export class ApprovedModalComponent
    implements OnInit {
        loading :boolean=false;
        email: string;
        roleList:any;
        role:string;
        status:string = 'Approved';
        statusID:string='APP';
        closeBtnName: string;
        constructor(public bsModalRef: BsModalRef, private roleService:RolesService) {}
        ngOnInit() {
            this.getRolesDetails();
        }
        getRolesDetails(){
            this.loading = true;
            this.roleService.getRolesDetails().subscribe((respose:any)=>{
                this.roleList=respose;
                this.loading =false;
            },err=>{
                this.loading =false;
            });
        }
        onSubmit(form:NgForm){
            alert(this.email);
            alert(form.value.role);
            alert(this.statusID);
        }
}