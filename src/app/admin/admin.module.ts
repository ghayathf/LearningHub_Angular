import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { AllCoursesTableComponent } from './all-courses-table/all-courses-table.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllMaterialsComponent } from './all-materials/all-materials.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ContactusComponent } from './contactus/contactus.component';
import { EmployeesComponent } from './employees/employees.component';
import { TraineeRequestsComponent } from './trainee-requests/trainee-requests.component';


import { AdminSideBarComponent } from '../shared/admin-side-bar/admin-side-bar.component';
import { AllSectionsComponent } from './all-sections/all-sections.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    MainComponent,
    AllCoursesTableComponent,
    CategoriesComponent,
    ContactusComponent,
    AllMaterialsComponent,
    EmployeesComponent,
    TraineeRequestsComponent,


    AllSectionsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule


  ]
})
export class AdminModule { }
