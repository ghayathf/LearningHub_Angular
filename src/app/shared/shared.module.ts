import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeHeaderComponent,
    HomeFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HomeHeaderComponent,
    HomeFooterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxSpinnerModule,

  ]
})
export class SharedModule { }
