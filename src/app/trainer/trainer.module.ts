import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    SharedModule
  ]
})
export class TrainerModule { }
