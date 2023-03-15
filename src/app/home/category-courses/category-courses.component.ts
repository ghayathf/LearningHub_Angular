import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-category-courses',
  templateUrl: './category-courses.component.html',
  styleUrls: ['./category-courses.component.css']
})
export class CategoryCoursesComponent {

  constructor(private route:ActivatedRoute,public courseService:CourseService,public categoryService:CategoryService) {}
  courses:any=[]
  categoryID:any
  ngOnInit(){
    
    this.categoryID=this.categoryService.GetSelectedCategory()
    this.GetCoursesByCategoryId(this.categoryID)
    console.log(this.categoryID)
  }
  GetCoursesByCategoryId(categoryId:any){
    this.courses.filter((x: {category_Id: number}) => x.category_Id == categoryId);
  }
}
