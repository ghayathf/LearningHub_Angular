import { Component, ElementRef, ViewChild } from '@angular/core';
import { TrainerService } from 'src/app/trainer.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartConfiguration, ChartOptions, Colors } from 'chart.js';
import { CourseService } from 'src/app/course.service';
import { CategoryService } from 'src/app/category.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { RegisterService } from 'src/app/register.service';
import { SectionService } from 'src/app/section.service';
import { TestimonialService } from 'src/app/testimonial.service';
import { ContactusService } from 'src/app/contactus.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild('chartContainer1') chartContainer1!: ElementRef;
  @ViewChild('chartContainer2') chartContainer2!: ElementRef;
constructor(public trainerService:TrainerService,public courseService:CourseService,public categoryService:CategoryService,public traineeService:RegisterService,public sectionService:SectionService,public testiomonialService:TestimonialService,public messageService: ContactusService) {
 
}
avgs:any =[]
x :any = 0
post:any = 0
pre:any = 0
cats:any=[]
cName:any
Ccount:any
totalTrainers:any
totalTrainees:any
tcourse:any
totalSections:any
tests:any
testimonials: any;
shuffledTestimonials: any;
x1:any
x2:any
x3:any
x4:any
c1:any
c2:any
c3:any
c4:any
d4:any
d1:any
d2:any
d3:any
m1:any
m2:any
m3:any
m4:any
e1:any
e2:any
e3:any
e4:any
f1:any
f2:any
f3:any
f4:any
async ngOnInit(){
await this.trainerService.GetAllTrainers()
await this.courseService.charts()
await this.testiomonialService.GetAllAcceptedTestimonilas();
await this.messageService.GetAllMessage();
await(this.x1=this.testiomonialService.Acceptedtestimonials[0]?.testimonialmessage)
await(this.x2=this.testiomonialService.Acceptedtestimonials[1]?.testimonialmessage)
await(this.x3=this.testiomonialService.Acceptedtestimonials[2]?.testimonialmessage)
await(this.x4=this.testiomonialService.Acceptedtestimonials[3]?.testimonialmessage)
await (this.courseService.GetAllCourses())
await(this.d1=Levels[this.courseService.courses[0]?.courselevel])
await(this.d2=Levels[this.courseService.courses[1]?.courselevel])
await(this.d3=Levels[this.courseService.courses[2]?.courselevel])
await(this.d4=Levels[this.courseService.courses[3]?.courselevel])

await(this.c4=this.courseService.courses[3]?.coursename)
await(this.c1=this.courseService.courses[0]?.coursename)
await(this.c2=this.courseService.courses[1]?.coursename)
await(this.c3=this.courseService.courses[2]?.coursename)

await(this.m1=this.messageService.ListOfMessage[0]?.message)
await(this.m2=this.messageService.ListOfMessage[1]?.message)
await(this.m3=this.messageService.ListOfMessage[2]?.message)
await(this.m4=this.messageService.ListOfMessage[3]?.message)

await(this.e1=this.messageService.ListOfMessage[0]?.email)
await(this.e2=this.messageService.ListOfMessage[1]?.email)
await(this.e3=this.messageService.ListOfMessage[2]?.email)
await(this.e4=this.messageService.ListOfMessage[3]?.email)

await(this.f1=this.messageService.ListOfMessage[0]?.firstname)
await(this.f2=this.messageService.ListOfMessage[1]?.firstname)
await(this.f3=this.messageService.ListOfMessage[2]?.firstname)
await(this.f4=this.messageService.ListOfMessage[3]?.firstname)
this.avgs =await this.courseService.avgs
this.x = this.avgs.map(function(elem: { coursename: any; }){return elem.coursename })
this.post = this.avgs.map(function(elem: { avgPostExamSolution: any; }){return elem.avgPostExamSolution })
this.pre = this.avgs.map(function(elem: { avgPreExamSolution: any; }){return elem.avgPreExamSolution })
this.radarChartLabels = this.x;
this.radarChartDatasets[0].data = this.pre
this.radarChartDatasets[1].data = this.post
await this.categoryService.GetAllCategories()
await(this.cats = this.categoryService.categories)
await(this.pieChartLabels= this.cats.map(function(elem: { categoryname: any; }){return elem.categoryname }))
// await(this.pieChartLabels=this.cName)
await (this.pieChartDatasets[0].data = this.cats.map(function(elem: { finalCourses: any; }) { return elem.finalCourses.length }))

  await this.trainerService.GetAllTrainers();
  await this.traineeService.GetAllAcceptedTrainee();
  this.totalTrainers=this.trainerService.tr.length;
  this.totalTrainees=this.traineeService.AcceptedTrainee.length;
  await this.courseService.GetAllCourses()
  this.tcourse=this.courseService.courses.length;
  // this.pieChartDatasets[0].data = this.Ccount;
  await this.sectionService.GetAllSections()
  this.totalSections=this.sectionService.sections.length;
  
//  await(this.tests = this.testiomonialService.Acceptedtestimonials)
//  await(this.shuffledTestimonials = this.shuffle(this.testimonials))
}
shuffle(array: any): any {
  let currentIndex = array.length;
  let temporaryValue: any;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
title2 = 'ng2-charts-demo';
public radarChartOptions: ChartConfiguration<"radar">["options"] = {
  responsive: true,
  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 0,
      display: true,
      grid: {
        color: 'black',
        lineWidth: 0.5
      },
      ticks: {
        display: false
      }
    }
  }

};
public radarChartLabels: string[] = [];

public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
  { data: [], label: 'AVG Pre-Exam' },
  { data: [], label: 'AVG Post-Exam' }
];
public pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
};
public pieChartLabels = [];
public pieChartDatasets = [ {
  data: []
} ];
public pieChartLegend = true;
public pieChartPlugins = [];
title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels:[],
    datasets: [
      {
        data: [],
        label: 'Average Pre exam',
        fill: true,
        tension: 0.5,
        borderColor: '#fff',
        backgroundColor:'transparent'
      },
      {
        data: [],
        label: 'Average Post Exam',
        fill: true,
        tension: 0.5,
        borderColor: 'red',
        backgroundColor:'transparent'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  MakePDF(){
    const doc = new jsPDF();

  // Get the chart canvases
  const radarChartCanvas = document.querySelector('#chart-container canvas')as HTMLCanvasElement;
  const pieChartCanvas = document.querySelector('#chart-container2 canvas')as HTMLCanvasElement;


  // Add the chart canvases to the PDF document
  if(radarChartCanvas && pieChartCanvas){
  const radarChartDataURL = radarChartCanvas.toDataURL('image/png');
  const pieChartDataURL = pieChartCanvas.toDataURL('image/png');
  const pageHeight = doc.internal.pageSize.height;

  // Add the text to the PDF document
  doc.text("Chart Report", doc.internal.pageSize.getWidth() / 2, 10, {
    align: 'center'
  });
  doc.addImage(radarChartDataURL, 'PNG', 10, 10, 100, 100);
  doc.addImage(pieChartDataURL, 'PNG', 10, 120,  100, 100);
  }
  // Add the chart images to the PDF document

  // Save the PDF document
  doc.save('charts.pdf');
  }
}
enum Levels {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}