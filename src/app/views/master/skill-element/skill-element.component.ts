import { Component, OnInit } from '@angular/core';
import { SkillElementsMaster } from '../../model/skillelementmodel';
import { NgForm } from '@angular/forms';
import { SkillelementService } from '../../service/skillelement.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';

@Component({
  selector: 'app-skill-element',
  templateUrl: './skill-element.component.html',
  styleUrls: ['./skill-element.component.scss']
})
export class SkillElementComponent implements OnInit {
  headerTitle ="Add Skillemets";
  skillelement :SkillElementsMaster;
  constructor(private sklelementSrvice:SkillelementService) { }
  orderlevel:number;
  slillelementName:string;
  skillname:string;
  skillId:number;
  skills:any[]=[];
  public loading = false;
  ngOnInit() {
    this.getSkillsList();
  }
  getSkillsList(){
    this.loading=true;
    this.sklelementSrvice.getSkillsList().subscribe((msg:any)=>{
      this.loading=false;
      this.skills=msg;
      console.log(msg);
      
    });
  }
  onSelect(event: TypeaheadMatch): void {
    this.skillId = event.item.id;
    alert(this.skillId );
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
       alert("form valid");
      }
     // console.log(JSON.stringify(this.skillmodel));
      // ...our form is valid, we can submit the data
  }
 
}
