import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { AuthGuardService } from '../auth/auth-guard.service';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
const routes: Routes = [{
    path: '',
    data: {
        title: "Payrolls"
    },
    children: [{
        path: '',
        redirectTo: 'payroll'
    },
    {
        path: 'payroll',
        component: PayrollsComponent,
        canActivate: [AuthGuardService]
    }
    ]
}]
@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]
})
export class PayrollRoutingModule { }