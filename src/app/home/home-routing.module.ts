import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CategoryCoursesComponent } from './category-courses/category-courses.component';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main/main.component';
import { TestimonialComponent } from '../admin/testimonial/testimonial.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  { path: 'all-courses', component: AllCoursesComponent }
  ,
  {
    path: 'category-courses', component: CategoryCoursesComponent
  },
  {
    path: 'Contact',
    component: ContactComponent
  },
  {
    path: "testimonial",
    component: TestimonialsComponent
  },
  {
    path: "AboutUs",
    component: AboutusComponent
  },
  {
    path: "details",
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
