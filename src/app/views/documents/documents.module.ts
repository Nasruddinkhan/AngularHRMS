
import { NgModule } from '@angular/core';
import { DocumentsDetailsComponent } from './documents-details/documents-details.component';
import { DocumentModuleRouting } from './document-module.routing';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@NgModule({
    imports:[ DocumentModuleRouting  ],
    declarations:[
        DocumentsDetailsComponent
    ]
})
export class DocumentModule{}