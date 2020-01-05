
import { NgModule } from '@angular/core';
import { DocumentsDetailsComponent } from './documents-details/documents-details.component';
import { DocumentModuleRouting } from './document-module.routing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@NgModule({
    imports:[ DocumentModuleRouting,CommonModule,
        FormsModule  ],
    declarations:[
        DocumentsDetailsComponent
    ]
})
export class DocumentModule{}