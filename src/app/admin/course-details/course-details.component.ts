import { Component } from '@angular/core';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
/**
 *
 */
constructor(public courseService:CourseService) {

}
}
