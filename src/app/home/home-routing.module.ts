import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CategoryCoursesComponent } from './category-courses/category-courses.component';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  { path: 'all-courses', component: AllCoursesComponent }
  ,
  {
    path: 'category-courses', component: CategoryCoursesComponent
  },
  {
    path: 'Contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
