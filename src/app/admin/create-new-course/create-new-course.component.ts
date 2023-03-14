import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-create-new-course',
  templateUrl: './create-new-course.component.html',
  styleUrls: ['./create-new-course.component.css']
})
export class CreateNewCourseComponent
{

  CreateForm = new FormGroup(
    {
    coursename : new FormControl('',Validators.required),
    coursedescription : new FormControl('',Validators.required),
    courseimage : new FormControl('',Validators.required),
    courselevel : new FormControl('',Validators.required),
    category_Id : new FormControl('',Validators.required)
    }
  )
  constructor(public courseService:CourseService,private router:Router) {}
  CreateCourse(){
    this.courseService.CreateCourse(this.CreateForm.value)
    this.router.navigate(["Admin/AllCourses"])
  }
}
