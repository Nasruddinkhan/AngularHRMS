import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './user-routing.module';
import { EductionDetailsComponent } from './eduction-details/eduction-details.component';

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
        UserRoutingModule
    ]

})
export class UserModule{

}