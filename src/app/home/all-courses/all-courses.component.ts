import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  courses:any=[]
  categoryName:string|null = ""

  constructor(private route:ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe(params => { this.categoryName = params.get('name');})
    this.GetCourses()
  }
  GetCourses(){
    this.courses=[
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
   },
   {
      name: 'Python for Data Science',
      categoryName: 'AI',
      level: 'Intermediate',
      lectures: 15,
      duration: 180
   },
   {
      name: 'Machine Learning Algorithms',
      categoryName: 'AI',
      level: 'Advanced',
      lectures: 25,
      duration: 240
   },
   {
      name: 'Java Programming for Beginners',
      categoryName: 'IT & Software',
      level: 'Beginner',
      lectures: 10,
      duration: 120
   },
   {
      name: 'Advanced C++',
      categoryName: 'Engineering',
      level: 'Advanced',
      lectures: 30,
      duration: 240
   },
   {
      name: 'Web Development with HTML and CSS',
      categoryName: 'Web Development',
      level: 'Beginner',
      lectures: 10,
      duration: 120
   },
   {
      name: 'React.js Fundamentals',
      categoryName: 'Web Development',
      level: 'Intermediate',
      lectures: 20,
      duration: 180
   },
   {
      name: 'iOS App Development with Swift',
      categoryName: 'Finance',
      level: 'Advanced',
      lectures: 30,
      duration: 240
   },
   {
      name: 'JavaScript for Beginners',
      categoryName: 'IT & Software',
      level: 'Beginner',
      lectures: 10,
      duration: 120
   },
   {
      name: 'Artificial Intelligence for Business',
      categoryName: 'AI',
      level: 'Intermediate',
      lectures: 20,
      duration: 180
   },
   {
      name: 'Data Structures and Algorithms',
      categoryName: 'Engineering',
      level: 'Intermediate',
      lectures: 25,
      duration: 240
   },
   {
      name: 'React Native for Web Developers',
      categoryName: 'Web Development',
      level: 'Intermediate',
      lectures: 20,
      duration: 180
   },
   {
      name: 'Android App Development with Kotlin',
      categoryName: 'Finance',
      level: 'Advanced',
      lectures: 30,
      duration: 240
   },
   {
      name: 'Blockchain Fundamentals',
      categoryName: 'IT & Software',
      level: 'Intermediate',
      lectures: 20,
      duration: 180
   },
   {
      name: 'Artificial Neural Networks',
      categoryName: 'AI',
      level: 'Advanced',
      lectures: 25,
      duration: 240
   },
   {
      name: 'Introduction to Electrical Engineering',
      categoryName: 'Engineering',
      level: 'Beginner',
      lectures: 10,
      duration: 120
   },
   {
      name: 'Node.js for Backend Development',
      categoryName: 'Web Development',
      level: 'Intermediate',
      lectures: 20,
      duration: 180
   },
   {
    name: 'Quantum Computing',
    categoryName: 'IT & Software',
    level: 'Advanced',
    lectures: 25,
    duration: 240
    },
    {
    name: 'Advanced Robotics',
    categoryName: 'Engineering',
    level: 'Advanced',
    lectures: 30,
    duration: 240
    },
    {
    name: 'Vue.js for Web Development',
    categoryName: 'Web Development',
    level: 'Intermediate',
    lectures: 20,
    duration: 180
    },
    {
    name: 'Natural Language Processing',
    categoryName: 'AI',
    level: 'Advanced',
    lectures: 25,
    duration: 240
    },
    {
    name: 'Computer Networking',
    categoryName: 'IT & Software',
    level: 'Intermediate',
    lectures: 20,
    duration: 180
    },
    {
    name: 'Introduction to Aerospace Engineering',
    categoryName: 'Engineering',
    level: 'Beginner',
    lectures: 10,
    duration: 120
    },
    {
    name: 'Full-Stack Web Development',
    categoryName: 'Web Development',
    level: 'Advanced',
    lectures: 30,
    duration: 240
    },
    {
    name: 'Robotics Process Automation',
    categoryName: 'Finance',
    level: 'Intermediate',
    lectures: 20,
    duration: 180
    },
    {
    name: 'Cloud Computing Fundamentals',
    categoryName: 'IT & Software',
    level: 'Intermediate',
    lectures: 20,
    duration: 180
    },
    {
    name: 'Deep Learning with TensorFlow',
    categoryName: 'AI',
    level: 'Advanced',
    lectures: 25,
    duration: 240
    }
      ].filter(courses=>courses.categoryName == this.categoryName);
  }
}
