import { Component } from '@angular/core';
import { TestimonialService } from 'src/app/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  constructor(public testiomonialService: TestimonialService) { }

  ngOnInit() {
    this.testiomonialService.GetAllTestimonilas();
  }
}
