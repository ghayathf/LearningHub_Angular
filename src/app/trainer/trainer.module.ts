import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TrainerRoutingModule } from './trainer-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AdminSideBarComponent } from '../shared/admin-side-bar/admin-side-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { EnumValuesPipe } from '../enum-values.pipe';
import { CourseDetailedComponent } from './course-detailed/course-detailed.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

@NgModule({
  declarations: [
    MainComponent,
    CourseDetailedComponent,
    EditProfileComponent,
    DeleteAccountComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    SharedModule,
    NgbDropdownModule,
    CommonModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    NgbDropdownModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressBarModule
  ]
})
export class TrainerModule { }
