import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from '../home/all-courses/all-courses.component';

import { AllCoursesTableComponent } from './all-courses-table/all-courses-table.component';
import { AllMaterialsComponent } from './all-materials/all-materials.component';
import { AllSectionsComponent } from './all-sections/all-sections.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EmployeesComponent } from './employees/employees.component';
import { MainComponent } from './main/main.component';
import { RegisterdUserComponent } from './registerd-user/registerd-user.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { TraineeRequestsComponent } from './trainee-requests/trainee-requests.component';
import { UpdateAboutComponent } from './update-about/update-about.component';
import { UpdateHomeComponent } from './update-home/update-home.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent
  },
  {
    path: 'AllCourses',
    component: AllCoursesTableComponent
  },
  {
    path: 'EditProfile',
    component: EditProfileComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: "contactus",
    component: ContactusComponent
  },
  {
    path: "AllMaterials",
    component: AllMaterialsComponent
  },
  {
    path: "Employees",
    component: EmployeesComponent
  },
  {
    path: "TraineeRequest",
    component: TraineeRequestsComponent
  },
  {
    path: "AllSections",
    component: AllSectionsComponent
  },
  {
    path: "Testimonial",
    component: TestimonialComponent
  },
  {
    path: "registerd",
    component: RegisterdUserComponent
  },
  {
    path: "Update-About",
    component: UpdateAboutComponent
  },
  {
    path: "Update-Home",
    component: UpdateHomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
