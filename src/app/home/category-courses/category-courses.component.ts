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
  categoryId:any
  async ngOnInit(){
    this.categoryId= this.categoryService.category
    await this.courseService.GetAllCourses()
    this.courses = this.courseService.courses.filter((x: { category_Id: any; })=>x.category_Id == this.categoryId.categoryid)
    console.log(this.categoryId)
    console.log(this.courseService);
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].courselevel == 1)

    this.courses[i].courselevel = Levels[1]

    else if (this.courses[i].courselevel == 2)

    this.courses[i].courselevel = Levels[2]

    else

    this.courses[i].courselevel = Levels[3]

    }


  }

}
enum Levels {

  Beginner = 1,

  Intermediate = 2,

  Advanced = 3,

}
