import { Component, Input, SimpleChange } from '@angular/core';
import { TestimonialService } from 'src/app/testimonial.service';
import {
  trigger,
  transition,
  state,
  style,
  animate
} from "@angular/animations";
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  constructor(public testiomonialService: TestimonialService) { }
tests:any = []
  async ngOnInit() {
    await this.testiomonialService.GetAllAcceptedTestimonilas();
    this.tests = this.testiomonialService.Acceptedtestimonials
    console.log(this.tests);

  }

}
