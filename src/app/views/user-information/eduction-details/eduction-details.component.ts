import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Component({
  selector: 'app-eduction-details',
  templateUrl: './eduction-details.component.html',
  styleUrls: ['./eduction-details.component.scss']
})
export class EductionDetailsComponent implements OnInit {
  eductionList = [];
  courseID: string;
  comments: string;
  collegeName: string
  univercity: string;

  courseList = [];
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourse();
  }
  getCourse() {
    this.courseService.findAllCourse().subscribe((res: any) => {
      this.courseList = res;
    })
  }
}
