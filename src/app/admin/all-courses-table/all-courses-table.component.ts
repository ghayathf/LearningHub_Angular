import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-all-courses-table',
  templateUrl: './all-courses-table.component.html',
  styleUrls: ['./all-courses-table.component.css']
})
export class AllCoursesTableComponent {
  @ViewChild('DeleteForm') Delete: any
  constructor(public courseService: CourseService, private router: Router, public spinner: NgxSpinnerService) {
  }


  ngOnInit() {
    this.courseService.GetAllCourses()
  }
  GetCourseById(courseid: number) {
    this.courseService.GetCourseById(courseid)
    this.router.navigate(["Admin/CourseDetails"])
  }
  onDeleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId);
    this.router.navigate(["Admin/AllCourses"])
  }



}
