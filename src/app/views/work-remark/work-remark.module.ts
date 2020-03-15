import { NgModule } from '@angular/core';
import { IntimeOuttimeComponent } from './intime-outtime/intime-outtime.component';
import { WorkStatusComponent } from './work-status/work-status.component';
import { WorkRemarkRoutingModule } from './work-remark.module.routing';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { WorkStatusListComponent } from './work-status/work-statuslist.component';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@NgModule({
    imports:[
        WorkRemarkRoutingModule,
        CommonModule,
        PaginationModule.forRoot(),
        FormsModule,
        CommonModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(), 
        PopoverModule.forRoot(),
        TooltipModule.forRoot()
    ],
    declarations:[
     IntimeOuttimeComponent,
     WorkStatusComponent,   
     WorkStatusListComponent
    ]
})
export class WorkRemarkModule{}
