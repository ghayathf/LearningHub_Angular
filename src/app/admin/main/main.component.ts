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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild('chartContainer1') chartContainer1!: ElementRef;
  @ViewChild('chartContainer2') chartContainer2!: ElementRef;
constructor(public trainerService:TrainerService,public courseService:CourseService,public categoryService:CategoryService) {

}
avgs:any =[]
x :any = 0
post:any = 0
pre:any = 0
cats:any=[]
cName:any
Ccount:any
ngOnInit(){
this.trainerService.GetAllTrainers()
this.courseService.charts()
this.avgs = this.courseService.avgs
this.x = this.avgs.map(function(elem: { coursename: any; }){return elem.coursename })
this.post = this.avgs.map(function(elem: { avgPostExamSolution: any; }){return elem.avgPostExamSolution })
this.pre = this.avgs.map(function(elem: { avgPreExamSolution: any; }){return elem.avgPreExamSolution })
this.lineChartData.labels = this.x;
this.lineChartData.datasets[0].data = this.pre
this.lineChartData.datasets[1].data = this.post
this.categoryService.GetAllCategories()
this.cats = this.categoryService.categories
this.cName = this.cats.map(function(elem: { categoryname: any; }){return elem.categoryname })
this.pieChartLabels=this.cName
this.Ccount = this.cats.map(function(elem: { finalCourses: any; }) { return elem.finalCourses.length; });

  this.pieChartDatasets[0].data = this.Ccount;
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
        color: 'white',
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
// Pie
public pieChartOptions: ChartOptions<'pie'> = {
  responsive: false,
};
public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
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