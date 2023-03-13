import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
