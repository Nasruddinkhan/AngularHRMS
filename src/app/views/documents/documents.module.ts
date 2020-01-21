
import { NgModule } from '@angular/core';
import { DocumentsDetailsComponent } from './documents-details/documents-details.component';
import { DocumentModuleRouting } from './document-module.routing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PreviewApplicationComponent } from './preview-application/preview-application.component';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@NgModule({
    imports:[ DocumentModuleRouting,CommonModule,NgxLoadingModule, ModalModule.forRoot(),
        FormsModule  ],
    declarations:[
        DocumentsDetailsComponent,
        PreviewApplicationComponent
    ],
    entryComponents:[PreviewApplicationComponent]
})
export class DocumentModule{}