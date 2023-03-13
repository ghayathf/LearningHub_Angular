import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-all-courses-table',
  templateUrl: './all-courses-table.component.html',
  styleUrls: ['./all-courses-table.component.css']
})
export class AllCoursesTableComponent {
/**
 *
 */
constructor(public courseService:CourseService,private router:Router) {
}
ngOnInit(){
  this.courseService.GetAllCourses()
}
GetCourseById(courseid:number){
  this.courseService.GetCourseById(courseid)
  this.router.navigate(["Admin/CourseDetails"])
}
}
