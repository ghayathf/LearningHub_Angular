import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './card/card.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CourseCardComponent } from './course-card/course-card.component';


@NgModule({
  declarations: [
    MainComponent,
    CardComponent,
    AllCoursesComponent,
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
})
export class HomeModule { }