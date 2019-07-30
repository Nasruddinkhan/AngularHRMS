import { Component, OnInit } from '@angular/core';
import { FormControl , NgForm} from "@angular/forms";
import { SkillService } from '../../service/skill.service';
import { ToastrService } from 'ngx-toastr';
import { SkillMaster } from '../../model/skillmodel';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  title = 'materialApp';
  headerTitle = "Add Skill";
  slillName:string;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public loading = false;
  skillList:any;
  skillmodel:SkillMaster;
  p: number = 1;
  initialPageSize: number = 5;
  constructor(private skillService:SkillService ,  private toastr:ToastrService, private router:Router) {
  //  this.loadStates();
   }
   collapsed(event: any): void {
    // console.log(event);
  }
  expanded(event: any): void {
    // console.log(event);
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  ngOnInit(): void {
    this.getSkillList();
  }

  getSkillList() {
  this.loading = true;
  this.skillService.getAllSkillDetails().subscribe((msg:any)=>{
    this.loading = false;
    console.log(msg);
    this.skillList=msg;
  },err=>{
    this.loading = false;
    console.log(err);
  });
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.skillmodel = new SkillMaster;
      console.log(form.value.slillName);
      console.log(form.value.orderlevel);
      this.skillmodel.activeStatus=1;
      this.skillmodel.createdBy="Nasruddin";
      this.skillmodel.createdDate=new Date();
      this.skillmodel.skillName=form.value.slillName;
      this.skillmodel.orderlevl = form.value.orderlevel;
      this.skillService.saveSkillDetail(this.skillmodel).subscribe((msg:any)=>{
        this.loading = false;
        console.log(msg);
        //this.skillList=msg;
        this.toastr.success('Add Skill Successfully','Skill Master',{
          positionClass:'toast-bottom-right' });
          this.getSkillList();
      },err=>{
        this.loading = false;
        this.toastr.error(err.message,'Internal Error',{
          positionClass:'toast-bottom-right' });
          this.router.navigate(['/master/error']);
        console.log(err);
      });
     // console.log(JSON.stringify(this.skillmodel));
      // ...our form is valid, we can submit the data
      form.reset();
    }
  }
 
}
