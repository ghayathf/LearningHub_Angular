import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    HomeHeaderComponent,
    HomeFooterComponent,
    AdminSideBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatStepperModule

  ],
  exports: [
    HomeHeaderComponent,
    HomeFooterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxSpinnerModule,
    AdminSideBarComponent,
    MatDialogModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatStepperModule

  ]
})
export class SharedModule { }
