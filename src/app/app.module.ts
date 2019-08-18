import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';

import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TokenInterceptorService } from './views/service/toekn-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http/';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse/';
import { WebcamModule } from 'ngx-webcam';
import { ErrorHandling } from './views/service/error.service';
import { ToastrModule } from 'ngx-toastr';
import { OnlynumberDirective } from './views/directive/onlynumber.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareCommonComonentModule } from './ShareCommonComonentModule';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SessionPromtModalComponent } from './session.promt.modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { OnlyCharecterDirective } from './views/directive/onlycharecter.directive';



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    NgxLoadingModule,
    FormsModule,
    CollapseModule.forRoot(),
    WebcamModule,
    ShareCommonComonentModule,
    ReactiveFormsModule,
    BrowserModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    NgIdleKeepaliveModule.forRoot(),
    NgbModule.forRoot(),
    SocialLoginModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    LoginComponent,
    RegisterComponent,
    SessionPromtModalComponent
  ],
  providers: [ErrorHandling, OnlynumberDirective,OnlyCharecterDirective, {
    provide: [LocationStrategy,AuthServiceConfig],
    useClass: HashLocationStrategy
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }]
  ,
  bootstrap: [AppComponent],
  entryComponents: [SessionPromtModalComponent]
})
export class AppModule { }
