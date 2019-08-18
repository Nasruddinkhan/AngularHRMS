import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './user-routing.module';
import { EductionDetailsComponent } from './eduction-details/eduction-details.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnlyCharecterDirective } from '../directive/onlycharecter.directive';

/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */

@NgModule({
    declarations:[
     UserDetailsComponent,
     EductionDetailsComponent,
     OnlyCharecterDirective
    ],
    imports:[
        UserRoutingModule,
        CollapseModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]

})
export class UserModule{

}