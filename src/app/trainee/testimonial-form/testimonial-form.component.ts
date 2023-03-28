import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/auth.guard';
import { SectionService } from 'src/app/section.service';
import { Route, Router } from '@angular/router';
import { TestimonialService } from 'src/app/testimonial.service';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.css']
})
export class TestimonialFormComponent {
constructor(public router:Router, public TestimonialService:TestimonialService){}
ngOnInit()
{
  
}
}
