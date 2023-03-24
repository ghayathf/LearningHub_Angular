import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraineeRoutingModule } from './trainee-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    MainComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    TraineeRoutingModule,
    SharedModule
  ]
})
export class TraineeModule { }
