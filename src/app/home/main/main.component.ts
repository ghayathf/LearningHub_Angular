import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/category.service';
import { CourseService } from 'src/app/course.service';
import { PagesService } from 'src/app/pages.service';
import { RegisterService } from 'src/app/register.service';
import { SectionService } from 'src/app/section.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestimonialService } from 'src/app/testimonial.service';
import { TrainerService } from 'src/app/trainer.service';
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
  constructor(private router: Router, private spinner: NgxSpinnerService, public categoryService: CategoryService, public courseService: CourseService, public testiomonialService: TestimonialService, private sectionService: SectionService, private traineeService: TrainerService, private trainerService: TrainerService, private registerService: RegisterService, public Data: PagesService) {
  }
  AllCourses: any
  AllTrainees: any
  AllTrainers: any
  AllSections: any
  async ngOnInit() {
    await this.courseService.GetAllCourses();
    this.AllCourses = this.courseService.courses;
    await this.traineeService.GetAllTrainers();
    this.AllTrainers = this.trainerService.trainers;
    await this.registerService.GetAllAcceptedTrainee();
    this.AllTrainees = this.registerService.AcceptedTrainee;
    await this.sectionService.GetAllSections()
    this.AllSections = this.sectionService.sections;
    await this.testiomonialService.GetAllAcceptedTestimonilas();
    console.log(this.testiomonialService.Acceptedtestimonials);

    await this.Data.GetAllHome();

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
