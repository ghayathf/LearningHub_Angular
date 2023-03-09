import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {
  courses:any=[]
  categoryName:string|null = ""

  constructor(private route:ActivatedRoute) {}

  ngOnInit(){
    this.categoryName = this.route.snapshot.paramMap.get('name')
    this.courses = [
       {
       name: 'Introduction to TypeScript',
       categoryName: 'AI',
       level: 'Beginner',
       lectures: 10,
       duration: 120
       },
       {
       name: 'Angular Fundamentals',
       categoryName: 'Web Development',
       level: 'Intermediate',
       lectures: 20,
       duration: 180
       },
       {
       name: 'React Native for Mobile Development',
       categoryName: 'Finance',
       level: 'Advanced',
       lectures: 30,
       duration: 240
       }
      ].filter(courses=>courses.categoryName == this.categoryName);
  }
}
