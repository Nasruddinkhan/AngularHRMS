import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './user-routing.module';
import { EductionDetailsComponent } from './eduction-details/eduction-details.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ShareCommonComonentModule } from '../../ShareCommonComonentModule';
import { CommonDirective } from '../../common.directives.module';
import {  NgxLoadingModule } from 'ngx-loading';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { EductionEditDetailsComponent } from './eduction-details/education-edit.details.component';
import { ModalModule } from 'ngx-bootstrap/modal';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */

@NgModule({
    declarations:[
     UserDetailsComponent,
     EductionDetailsComponent,
     EductionEditDetailsComponent
    ],
    imports:[
        TooltipModule.forRoot(),
        UserRoutingModule,
        CollapseModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BsDatepickerModule.forRoot(),
        ShareCommonComonentModule,
        CommonDirective,
        NgxLoadingModule,
        ModalModule.forRoot(),
        
    ],
    providers: [DatePipe],
    entryComponents: [
        EductionEditDetailsComponent
    ]
})
export class UserModule{

}