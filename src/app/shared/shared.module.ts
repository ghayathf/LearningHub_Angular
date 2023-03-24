import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { NgChartsModule } from 'ng2-charts';
import { TrainerHeaderComponent } from './trainer-header/trainer-header.component';
import { TrainerSideBarComponent } from './trainer-side-bar/trainer-side-bar.component';
import { TrainerBannerComponent } from './trainer-banner/trainer-banner.component';
import { TraineeHeaderComponent } from './trainee-header/trainee-header.component';
import { TraineeSideBarComponent } from './trainee-side-bar/trainee-side-bar.component';
import { TraineeBannerComponent } from './trainee-banner/trainee-banner.component';


@NgModule({
  declarations: [
    HomeHeaderComponent,
    HomeFooterComponent,
    AdminSideBarComponent,
    AdminHeaderComponent,
    TrainerHeaderComponent,
    TrainerSideBarComponent,
    TrainerBannerComponent,
    TraineeHeaderComponent,
    TraineeSideBarComponent,
    TraineeBannerComponent,
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
    MatStepperModule,
    NgbDropdownModule,
    MatInputModule,
    NgChartsModule

  ],
  exports: [
    HomeHeaderComponent,
    HomeFooterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    AdminSideBarComponent,
    MatDialogModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    AdminHeaderComponent,
    MatBadgeModule,
    MatStepperModule,
    NgbDropdownModule,
    MatDialogClose,
    NgxSpinnerModule,
    NgChartsModule,
    TrainerHeaderComponent,
    TrainerSideBarComponent,
    TrainerBannerComponent,
    TraineeHeaderComponent,
    TraineeSideBarComponent,
    TraineeBannerComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule { }
