import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private router:Router,private http:HttpClient,public spinner:NgxSpinnerService) { }

  courses:any = []
  GetAllCourses(){
    this.http.get("https://localhost:44391/api/Courses/GetAllCourses").subscribe(
      (res)=>{this.courses=res},
      (err)=>{console.log(err);
      }
    )
  }
  course:any
  GetCourseById(courseId:number){
    this.http.get("https://localhost:44391/api/Courses/GetCourseById/"+courseId).subscribe(
      {
        next:(res)=>{this.course=res},
        error:(err)=>{console.log(err);
        }
      }
    )
  }
  courseCategories:any=[]
  GetCoursesByCategoryId(categoryId:number){

    this.courseCategories=this.courses.filter((x: {category_Id: number}) => x.category_Id == categoryId);
    this.router.navigate(["/CategoryCourses"])
  }
  CreateCourse(newCourse:any){
    this.spinner.show()
    this.http.post("https://localhost:44391/api/Courses/CreateCourse",newCourse).subscribe(
      {
        next:()=>{this.spinner.hide()},
        error:()=>{this.spinner.hide()}
      }
    )
  }
}
