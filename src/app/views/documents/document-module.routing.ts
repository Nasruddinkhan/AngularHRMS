import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsDetailsComponent } from './documents-details/documents-details.component';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
const routes:Routes=[{
    path:'',
    data:{
        title:'Documents'
    },
    children:[{
        path:'',
        redirectTo:'mydoc'
    },
    {
        path:'mydoc',
       component:DocumentsDetailsComponent
    }
]
}]
@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]
})
export class DocumentModuleRouting{}