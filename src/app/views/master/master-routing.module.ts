import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillComponent } from './skill/skill.component';
import { SkillElementComponent } from './skill-element/skill-element.component';
import { UploadMasterComponent } from './upload-master/upload-master.component';
import { P500Component } from '../error/500.component';
const routes: Routes=[{
    path:'',
    data:{
        title:'Skills'
    },
    children:[{
        path:'',
        redirectTo:'userskill'
    },
    {
        path:'userskill',
        data:{
            title:'Skills'
        },
        component:SkillComponent
    },
    {
        path:'skillelements',
        data:{
            title:'Skill elements'
        },
        component:SkillElementComponent
    },
    {
        path:'uploadmaster',
        data:{
            title:'Upload master'
        },
        component:UploadMasterComponent
    },
    {
        path:'error',
        data:{
            title:'error'
        },
        component:P500Component
    }
    ]
    }]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
