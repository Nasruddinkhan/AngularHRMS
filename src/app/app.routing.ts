import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuardService } from './views/auth/auth-guard.service';
import { UnAthorizeComponent } from './views/error/unathorize.component';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
export const routes: Routes = [
  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
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
    path:'unathorise',
    data:{
    path:'unathorise',
        title:'error'
    },
    component:UnAthorizeComponent,
    canActivate: [AuthGuardService],
},
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'master',
        loadChildren: './views/master/master.module#MasterModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'user',
        loadChildren: './views/user-information/user-module#UserModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'documents',
        loadChildren: './views/documents/documents.module#DocumentModule',
        canActivate: [AuthGuardService],
      },
    
      {
        path: 'workremark',
        loadChildren: './views/work-remark/work-remark.module#WorkRemarkModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'payemp',
        loadChildren: './views/payroll/payroll.module#PayrollModule',
        canActivate: [AuthGuardService],
      },
    ]  
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
