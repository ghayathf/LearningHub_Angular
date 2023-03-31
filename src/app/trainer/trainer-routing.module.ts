import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailedComponent } from './course-detailed/course-detailed.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MainComponent } from './main/main.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'CourseDetailed',
    component: CourseDetailedComponent
  },
  {
    path: 'EditTrainerProfile',
    component: EditProfileComponent
  },
  {
    path: 'DeleteAccount',
    component: DeleteAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
