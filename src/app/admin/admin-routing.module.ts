import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from '../home/all-courses/all-courses.component';
import { AllCoursesTableComponent } from './all-courses-table/all-courses-table.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateNewCourseComponent } from './create-new-course/create-new-course.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent
  },
  {
    path: 'CreateCourse',
    component: CreateNewCourseComponent
  },
  {
    path: 'AllCourses',
    component: AllCoursesTableComponent
  },
  {
    path: 'CourseDetails',
    component: CourseDetailsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'CategoryDetails',
    component: CategoryDetailsComponent
  },
  {
    path: 'CreateCategory',
    component: CreateCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
