import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraineeRoutingModule } from './trainee-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

@NgModule({
  declarations: [
    MainComponent,
    EditProfileComponent,
    CourseDetailsComponent,
    TestimonialFormComponent,
    DeleteAccountComponent
  ],
  imports: [
    CommonModule,
    TraineeRoutingModule,
    SharedModule,
    MatProgressBarModule
  ]
})
export class TraineeModule { }
