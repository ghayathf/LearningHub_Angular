import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './card/card.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CategoryCoursesComponent } from './category-courses/category-courses.component';

import { ContactComponent } from './contact/contact.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DetailsComponent } from './details/details.component';
import { RegisterDoneComponent } from './register-done/register-done.component';


@NgModule({
  declarations: [
    MainComponent,
    CardComponent,
    AllCoursesComponent,
    CourseCardComponent,
    CategoryCoursesComponent,

    ContactComponent,
      TestimonialsComponent,
      AboutusComponent,
      DetailsComponent,
      RegisterDoneComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
 
})
export class HomeModule { }
