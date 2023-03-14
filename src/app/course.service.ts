import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private router:Router,private http:HttpClient,private categoryService:CategoryService) { }

  courses:any = []
  GetAllCourses(){
    this.http.get("https://localhost:44391/api/Courses/GetAllCourses").subscribe(
      (res)=>{this.courses=res},
      (err)=>{console.log(err);
      }
    )
  }
  category:any
  ngOnInit(): void {
    this.category = this.categoryService.GetSelectedCategory();
    this.GetCoursesByCategoryId(this.category.categoryid);
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
    this.GetAllCourses()
    this.courseCategories=this.courses.filter((x: {category_Id: number}) => x.category_Id == categoryId);
    //this.router.navigate(["/all-courses"])
    this.router.navigate(["/category-courses"])
  }

}
