import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkillComponent } from './skill/skill.component';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { SkillElementComponent } from './skill-element/skill-element.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { OnlynumberDirective } from '../directive/onlynumber.directive';
import { NgxLoadingModule } from 'ngx-loading';
import { ApplicationPipesModule } from '../../ApplicationPipesModule';
import {NgxPaginationModule} from 'ngx-pagination';
/* import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule,MatInputModule} from '@angular/material'; */
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UploadMasterComponent } from './upload-master/upload-master.component';
import { P500Component } from '../error/500.component';
import { ShareCommonComonentModule } from '../../ShareCommonComonentModule';

/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      MasterRoutingModule,
      NgxPaginationModule,
    /*   BrowserModule,
      BrowserAnimationsModule,
      MatAutocompleteModule,
      MatInputModule, */
      FormsModule,
      ReactiveFormsModule,
      CollapseModule.forRoot(),
      ToastrModule.forRoot(),
      NgxLoadingModule,
      ApplicationPipesModule,
      TypeaheadModule.forRoot(),
      ModalModule.forRoot(),
      ShareCommonComonentModule
    ],
    declarations: [ SkillComponent, SkillElementComponent, OnlynumberDirective, UploadMasterComponent],
    bootstrap:[SkillElementComponent]
  })
export class MasterModule{

}