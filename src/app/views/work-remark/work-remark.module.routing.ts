import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntimeOuttimeComponent } from './intime-outtime/intime-outtime.component';
import { WorkStatusComponent } from './work-status/work-status.component';
import { AuthGuardService } from '../auth/auth-guard.service';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
const routes: Routes = [{
    path: '',
    data: {
        title: ''
    },
    children: [{
        path: '',
        redirectTo: 'inouttime'
    },
    {
        path: 'inouttime',
        component: IntimeOuttimeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'workstatus',
        component: WorkStatusComponent,
        canActivate: [AuthGuardService]
    }
    ]
}]
@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]
})
export class WorkRemarkRoutingModule {

}