import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/category.service';
import { CourseService } from 'src/app/course.service';
import { RegisterService } from 'src/app/register.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestimonialService } from 'src/app/testimonial.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  image: string = ""
  name: string = ""
  details: string = ""
  cats: any = []
  constructor(private router: Router, private spinner: NgxSpinnerService, public categoryService: CategoryService, public courseService: CourseService, public testiomonialService: TestimonialService, public userService: RegisterService) {
  }
  async ngOnInit() {
    await this.userService.getAllUsers();
    /** spinner starts on init */
    await this.testiomonialService.GetAllAcceptedTestimonilas();
    console.log(this.testiomonialService.Acceptedtestimonials);
    this.userService.GetAllTrainee();

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
    this.spinner.show("mySpinner", {
      type: "line-scale-party",
      size: "large",
      bdColor: "rgba(0, 0, 0, 1)",
      color: "red",
      template:
        "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />",
    });
    this.categoryService.GetAllCategories()
    this.courseService.GetAllCourses();
  }
  GetValues(categoryid: any) {
    this.courseService.GetCoursesByCategoryId(categoryid)
    this.router.navigate(["/all-courses"])
  }
  selectCategory(categoryid: number) {
    this.categoryService.GetCategoryById(categoryid);
    this.router.navigate(["/category-courses"])
  }
}
