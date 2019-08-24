import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './user-routing.module';
import { EductionDetailsComponent } from './eduction-details/eduction-details.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ShareCommonComonentModule } from '../../ShareCommonComonentModule';
import { CommonDirective } from '../../common.directives.module';

/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */

@NgModule({
    declarations:[
     UserDetailsComponent,
     EductionDetailsComponent
     
    ],
    imports:[
        UserRoutingModule,
        CollapseModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BsDatepickerModule.forRoot(),
        ShareCommonComonentModule,
        CommonDirective
    ]

})
export class UserModule{

}