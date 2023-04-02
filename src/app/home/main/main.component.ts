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
  par1:any
  par2:any
  async ngOnInit() {
    await this.Data.GetLengths()
    await this.testiomonialService.GetAllAcceptedTestimonilas();
    await this.Data.GetAllHome();
    await this.categoryService.GetAllCategories()
    this.AllCourses = this.Data.lengths[0].tableLength;
    this.AllTrainers = this.Data.lengths[1].tableLength;
    this.AllTrainees = this.Data.lengths[2].tableLength;
    this.AllSections = this.Data.lengths[3].tableLength;

    this.cats = this.categoryService.categories
    this.par1 = this.Data.homes[0].paragraph1
    this.par2 = this.Data.homes[0].paragraph2
  }

  async selectCategory(categoryid: number) {
    await this.categoryService.GetCategoryById(categoryid);
    this.router.navigate(["/category-courses"])
  }
}
