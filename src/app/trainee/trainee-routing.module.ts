import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MainComponent } from './main/main.component';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent
  },
  {
    path:'EditTraineeProfile',
    component:EditProfileComponent
  },
  {
    path:'CourseDetails',
    component:CourseDetailsComponent
  },
  {
    path:'Testimonial',
    component:TestimonialFormComponent
  },
  {
    path:'DeleteAccount',
    component:DeleteAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeRoutingModule { }
