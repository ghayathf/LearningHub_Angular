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
    this.AllCourses = this.courseService.courses.length;
    await this.traineeService.GetAllTrainers();
    this.AllTrainers = this.trainerService.trainers.length;
    await this.registerService.GetAllAcceptedTrainee();
    this.AllTrainees = this.registerService.AcceptedTrainee.length;
    await this.sectionService.GetAllSections()
    this.AllSections = this.sectionService.sections.length;
    await this.testiomonialService.GetAllAcceptedTestimonilas();
    console.log(this.testiomonialService.Acceptedtestimonials);

    await this.Data.GetAllHome();
    await this.categoryService.GetAllCategories()
    this.cats = this.categoryService.categories
    console.log(this.cats)
  }

  async selectCategory(categoryid: number) {
    await this.categoryService.GetCategoryById(categoryid);
    this.router.navigate(["/category-courses"])
  }
}
