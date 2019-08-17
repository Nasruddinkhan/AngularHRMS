
import { NgModule } from '@angular/core';
import { P500Component } from './views/error/500.component';
import { CommonModule } from '@angular/common';
import { UnAthorizeComponent } from './views/error/unathorize.component';

/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */

@NgModule ({
    declarations:[
        P500Component,
        UnAthorizeComponent
    ],
    imports:[
        CommonModule
    ]
})
export class ShareCommonComonentModule{

}