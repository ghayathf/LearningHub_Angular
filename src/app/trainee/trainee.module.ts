import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraineeRoutingModule } from './trainee-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    MainComponent,
    EditProfileComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    TraineeRoutingModule,
    SharedModule,
    MatProgressBarModule
  ]
})
export class TraineeModule { }
