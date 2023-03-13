import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from '../home/all-courses/all-courses.component';
import { AllCoursesTableComponent } from './all-courses-table/all-courses-table.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CreateNewCourseComponent } from './create-new-course/create-new-course.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent
  },
  {
    path:'CreateCourse',
    component:CreateNewCourseComponent
  },
  {
    path:'AllCourses',
    component:AllCoursesTableComponent
  },
  {
    path:'CourseDetails',
    component:CourseDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
