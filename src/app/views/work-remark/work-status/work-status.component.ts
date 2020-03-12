import { Component, OnInit } from '@angular/core';
import { SkillelementService } from '../../service/skillelement.service';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { NgForm } from '@angular/forms';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { WorkStatus } from '../../model/workstatus.model';
import { WorkstatusService } from '../../service/workstatus.service';
import { ToastrService } from 'ngx-toastr';

/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 2,
    minuteStep: 10,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds'
  });
}
@Component({
  selector: 'app-work-status',
  templateUrl: './work-status.component.html',
  styleUrls: ['./work-status.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class WorkStatusComponent implements OnInit {
  pastDate: Date;
  futureDate: Date;
  timepickerVisible = false;
  ismeridian: boolean = true;
  skillsList = [];
  skillsEleList =[];
  startTime:  Date;
  endTime: Date;
  workRemork:WorkStatus;
  userID:number;
  workList=[];
  pageNo = 1;
  bigTotalItems: number;
  numPages: number = 0;
  maxSize: number = 5;
  constructor(private skillService: SkillelementService,
              private toastr: ToastrService,
              private workStatusService:WorkstatusService) {
    this.pastDate = new Date();
    this.pastDate.setDate(this.pastDate.getDate() - 7);
    this.futureDate = new Date();
    this.futureDate.setDate(this.futureDate.getDate());

  }
  toggleMode(): void {
    this.ismeridian = !this.ismeridian;
  }
  ngOnInit() {
    this.getSkills();
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.userID = user.userID;
    this.findAll();

  }
  async findAll(){
    await this.workStatusService.findAll(this.userID, this.pageNo).then((res:any)=>{
      this.workList=res.content;
      this.bigTotalItems = res.totalElements;
     
    })
  }
  getSkills() {
    this.skillService.getSkillsList().subscribe((res: any) => {
      this.skillsList = res;
  
    });
  }
  fetchSkillCourse(skillId) {
    this.skillsEleList=[];
    this.skillService.findAllElementSkill(skillId).subscribe((res:any)=>{
      this.skillsEleList=res;
    });
  }
  async onSubmit(form: NgForm) {
    
    if(form.valid){
      this.workRemork= new WorkStatus;
    //  this.workRemork.workDate = form.value.
    this.workRemork.workDate = form.value.remarkdate;
    this.workRemork.endTime = form.value.endTime;
    this.workRemork.startTime=form.value.startTime;
    this.workRemork.remarks=form.value.remark;
    let skillId =form.value.slillName;
    let skilleleId =form.value.skillelementname;
    console.log(JSON.stringify(this.workRemork));
    await this.workStatusService.saveWorkRemark( this.workRemork,skillId,skilleleId,this.userID).then((res:any)=>{
      this.toastr.success('Add Remark Status Successfuly', 'Errors', {
        positionClass: 'toast-bottom-right'
      });
      this.findAll();
    },err=>{
      this.toastr.error(err.error.message, 'Errors', {
        positionClass: 'toast-bottom-right'
      });
    });
    }
  }
}
