import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-workstatus-list',
    templateUrl: './workListcomponent.html',
    styleUrls: ['./work-status.component.scss']
})

export class WorkStatusListComponent {
   // @Input()=5;
 
    pageNo = 1;
    numPages: number = 0;
    maxSize: number = 5;
    @Input()
    workList = [];
    @Input()
    bigTotalItems:number
    @Output() childEvent = new EventEmitter<Number>();
    deleteWorkRemorks(workStatusID: number) {
        alert('call inside child' + workStatusID);
        this.childEvent.emit(workStatusID);
    }
    @Output() childpageEvent = new EventEmitter<any>();
    pageChanged(event:any){
        this.childpageEvent.emit(event);
    }
}