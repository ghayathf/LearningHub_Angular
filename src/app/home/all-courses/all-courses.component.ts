import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  courses:any=[]

  constructor(private route:ActivatedRoute,public courseService:CourseService,public categoryService:CategoryService) {}

  ngOnInit(){
    this.courses = this.courseService.GetAllCourses()
  }
  
  

}
