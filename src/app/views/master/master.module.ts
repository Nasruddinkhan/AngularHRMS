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
import { ShareCommonComonentModule } from '../../ShareCommonComonentModule';
import { CommonDirective } from '../../common.directives.module';
import { RolesComponent } from './roles/roles.component';
import { AppStatusComponent } from './app-status/app-status.component';
import { SearchEmployeesComponent } from './search-employees/search-employees.component';
import { TagInputModule } from 'ngx-chips';
import { MenuMasterComponent } from './menu-master/menu-master.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { AsingMenuAccessComponent } from './asing-menu-access/asing-menu-access.component';
import { CityComponent } from './city/city.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { CourseDetailsComponent } from './course-details/course-details.component';



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
      ReactiveFormsModule,
      CollapseModule.forRoot(),
      ToastrModule.forRoot(),
      NgxLoadingModule,
      ApplicationPipesModule,
      TypeaheadModule.forRoot(),
      ModalModule.forRoot(),
      CommonDirective,
      ShareCommonComonentModule,
      TagInputModule
    ],
    declarations: [ SkillComponent ,SkillElementComponent,CityComponent, StateMasterComponent, UploadMasterComponent, RolesComponent, AppStatusComponent, SearchEmployeesComponent, MenuMasterComponent, SubMenuComponent, AsingMenuAccessComponent, CourseDetailsComponent],
    bootstrap:[SkillElementComponent]
  })
export class MasterModule{

}