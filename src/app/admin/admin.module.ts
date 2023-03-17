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
import { AllMaterialsComponent } from './all-materials/all-materials.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { ContactusComponent } from './contactus/contactus.component';
import { AdminSideBarComponent } from '../shared/admin-side-bar/admin-side-bar.component';
import { AllSectionsComponent } from './all-sections/all-sections.component';
import { CreateSectionComponent } from './create-section/create-section.component';



@NgModule({
  declarations: [
    MainComponent,
    CreateNewCourseComponent,
    AllCoursesTableComponent,
    CourseDetailsComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    CreateCategoryComponent,
    ContactusComponent,
    AllMaterialsComponent,
    AllSectionsComponent,
    CreateSectionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    


  ]
})
export class AdminModule { }
