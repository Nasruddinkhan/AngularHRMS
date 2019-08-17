import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EductionDetailsComponent } from './eduction-details/eduction-details.component';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
const routes: Routes=[{
    path:'',
    data:{
        title:'User'
    },
    children:[{
        path:'',
        redirectTo:'personal'
    },{
        path:'personal',
        data:{
            title:'Personal Details'
        },
        component:UserDetailsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path:'education',
        data:{
            title:'Education Details'
        },
        component:EductionDetailsComponent,
        canActivate: [AuthGuardService]
    }
]
}]
@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]
})
export class UserRoutingModule{}