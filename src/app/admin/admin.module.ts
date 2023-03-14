import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { CreateNewCourseComponent } from './create-new-course/create-new-course.component';
import { AllCoursesTableComponent } from './all-courses-table/all-courses-table.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CreateCategoryComponent } from './create-category/create-category.component';


@NgModule({
  declarations: [
    MainComponent,
    CreateNewCourseComponent,
    AllCoursesTableComponent,
    CourseDetailsComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
