import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillComponent } from './skill/skill.component';
import { SkillElementComponent } from './skill-element/skill-element.component';
import { UploadMasterComponent } from './upload-master/upload-master.component';
import { P500Component } from '../error/500.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { UnAthorizeComponent } from '../error/unathorize.component';
import { RolesComponent } from './roles/roles.component';
import { AppStatusComponent } from './app-status/app-status.component';
import { SearchEmployeesComponent } from './search-employees/search-employees.component';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
const routes: Routes=[{
    path:'',
    data:{
        title:'Skills'
    },
    children:[{
        path:'',
        redirectTo:'userskill'
    },
    {
        path:'userskill',
        data:{
            title:'Skills'
        },
        component:SkillComponent,
        canActivate: [AuthGuardService],
    },
    {
        path:'skillelements',
        data:{
            title:'Skill elements'
        },
        component:SkillElementComponent,
        canActivate: [AuthGuardService],
    },
    {
        path:'uploadmaster',
        data:{
            title:'Upload master'
        },
        component:UploadMasterComponent,
        canActivate: [AuthGuardService],
    },
    {
        path:'role',
        data:{
            title:'role master'
        },
        component:RolesComponent,
        canActivate: [AuthGuardService],
    },
    {
        path:'status',
        data:{
            title:'status master'
        },
        component:AppStatusComponent,
        canActivate: [AuthGuardService],
    },
    {
        path:'error',
        data:{
            title:'error'
        },
        component:P500Component,
        canActivate: [AuthGuardService],
    },
    {
        path:'searchemployee',
        data:{
            title:'Serarch Employee'
        },
        component:SearchEmployeesComponent,
        canActivate: [AuthGuardService],
    },
    {
        path:'unathorise',
        data:{
            title:'unathorise'
        },
        component:UnAthorizeComponent,
        canActivate: [AuthGuardService],
    }

    
    ]
    }]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
