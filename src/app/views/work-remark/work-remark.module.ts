import { NgModule } from '@angular/core';
import { IntimeOuttimeComponent } from './intime-outtime/intime-outtime.component';
import { WorkStatusComponent } from './work-status/work-status.component';
import { WorkRemarkRoutingModule } from './work-remark.module.routing';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@NgModule({
    imports:[
        WorkRemarkRoutingModule
    ],
    declarations:[
     IntimeOuttimeComponent,
     WorkStatusComponent   
    ]
})
export class WorkRemarkModule{}
