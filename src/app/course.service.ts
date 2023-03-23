import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private router: Router, private http: HttpClient, public spinner: NgxSpinnerService, private categoryService: CategoryService, private toaster: ToastrService) { }

  courses: any = []
  GetAllCourses() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44391/api/Courses/GetAllCourses").subscribe(
        (res) => {
          this.courses = res
          this.spinner.hide()
          resolve()
        },
        (err) => {
          console.log(err);
          this.spinner.hide()
        }
      )
    })
  }
  selectedSectionId:any
  selectedCourseId:any
  category: any
  ngOnInit(): void {
    // this.category = this.categoryService.GetSelectedCategory();
    //this.GetCoursesByCategoryId(this.category.categoryid);
  }
  course: any
  GetCourseById(courseId: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44391/api/Courses/GetCourseById/" + courseId).subscribe(
        {
          next: (res) => {
            this.course = res
            this.spinner.hide()
            resolve()
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    })
  }
  courseCategories: any = []
  GetCoursesByCategoryId(categoryId: number) {
    this.GetAllCourses()
    this.courseCategories = this.courses.filter((x: { category_Id: number }) => x.category_Id == categoryId);
    //this.router.navigate(["/all-courses"])
    this.categoryService.GetCategoryById(categoryId)
    console.log(categoryId)
    this.router.navigate(["/category-courses"])

  }
  CreateCourse(newCourse: any) {
    newCourse.courseimage = this.ImgaeName;
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.post("https://localhost:44391/api/Courses/CreateCourse", newCourse).subscribe(
        {
          next: () => {
            this.spinner.hide()
            this.toaster.success("Create Course Successfuly");
            resolve()
          },
          error: () => {
            this.spinner.hide()
            this.toaster.error("Try Again");
          }
        }
      )
    })
  }
  deleteCourse(courseId: number) {
    return new Promise<void>((resolve, reject) => {
      this.http.delete("https://localhost:44391/api/Courses/DeleteCourse/" + courseId).subscribe(
        {
          next: () => {
            this.spinner.hide()
            this.toaster.success("Deleted Category Successfuly");
            resolve()
          },
          error: () => {
            this.spinner.hide()
            this.toaster.success("Try Again");
          }
        }
      )
    })

  }

  async UpdateCourse(Course: any) {
    Course.courseimage = this.ImgaeName;
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.put("https://localhost:44391/api/Courses/UpdateCourse", Course).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Course Updated Successfully");
            resolve();
          },
          error: () => {
            this.spinner.hide();
            this.toaster.error("Try again");

          }


        }
      )
    })

  }
  searchedCourses:any = []
  searchCourses(courseName?: string): Observable<any> {
    const body: { [key: string]: any } = {};
      body['coursename'] = courseName
    return this.http.post("https://localhost:44391/api/Courses/SearchCourse",body);
  }
  ImgaeName = "";

  UploadImage(imageFile: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {

    this.http.post("https://localhost:44391/api/Courses/UploadImage", imageFile).subscribe(
      {
        next: (res: any) => {
          this.spinner.hide()
          this.ImgaeName = res.courseimage;
          resolve()
        },
        error: () => { }
      }
    )})
  }
  avgs:any =[]
  charts(){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/Courses/CoursesAvgs").subscribe(
      {
        next:(res)=>{
          this.spinner.hide()
          this.avgs = res;
          resolve()
        },
        error:(err)=>{
          this.spinner.hide()
          console.log(err);

        }
      }
    )})
  }
}
enum Levels
 { Beginner = 1,
  Intermediate = 2,
  Advanced = 3, }
