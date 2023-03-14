import { Component, EventEmitter, Input,OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  /**
   *
   */
  constructor(private router:Router,public courseService:CourseService,public categoryService:CategoryService) {


  }
@Input() cardImage?:string
@Input() cardName?:string

@Output() SendValues = new EventEmitter()
SendCourses(name?:string,image?:string,details?:string){
  const product = {
    proImage:image,
    proName:name,
  }
  this.SendValues.emit(product)

}
}
