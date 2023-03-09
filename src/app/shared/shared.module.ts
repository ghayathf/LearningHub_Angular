import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';



@NgModule({
  declarations: [
    HomeHeaderComponent,
    HomeFooterComponent
  ],
  imports: [
    CommonModule,

  ],
  exports:[
    HomeHeaderComponent,
    HomeFooterComponent
  ]
})
export class SharedModule { }
