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
import { MenuMasterComponent } from './menu-master/menu-master.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { AsingMenuAccessComponent } from './asing-menu-access/asing-menu-access.component';
import { CityComponent } from './city/city.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { UnivercityComponent } from './univercity/univercity.component';
import { DocumentmasterComponent } from './documentmaster/documentmaster.component';
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
        path:'asingmenu',
        data:{
            title:'Asing Menu to Access'
        },
        component:AsingMenuAccessComponent,
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
        path:'unathorize',
        data:{
            title:'unathorize user'
        },
        component:UnAthorizeComponent,
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
        path:'state',
        data:{
            title:'state master'
        },
        component:StateMasterComponent,
        canActivate: [AuthGuardService],
    },
    {
        path:'course',
        data:{
            title:'course master'
        },
        component:CourseDetailsComponent,
        canActivate: [AuthGuardService],
    },
    {
        path:'city',
        data:{
            title:'city master'
        },
        component:CityComponent,
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
    },
    {
        path:'menumaster',
        data:{
            title:'Menu Master'
        },
        component:MenuMasterComponent,
        canActivate: [AuthGuardService],

    } ,
    {
        path:'univercity',
        data:{
            title:'univercity Master'
        },
        component:UnivercityComponent,
        canActivate: [AuthGuardService],

    } 
    ,
    {
        path:'submenumaster',
        data:{
            title:'Sub Menu Master'
        },
        component:SubMenuComponent,
        canActivate: [AuthGuardService],

    }    
    ,
    {
        path:'documentmaster',
        data:{
            title:'Document Master'
        },
        component:DocumentmasterComponent,
        canActivate: [AuthGuardService],

    }   
    ]
    }]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
