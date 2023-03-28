import { Component } from '@angular/core';
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

  async MakePDF(){
  //   const chartContainer = document.getElementById('chart-container');
  //   const chartCanvas = chartContainer.querySelector('canvas');
  //   const chartContext = chartCanvas.getContext('2d');
    
  //   const chartContainer2 = document.getElementById('chart-container2');
  //   const chartCanvas2 = chartContainer2.querySelector('canvas');
  //   const chartContext2 = chartCanvas2.getContext('2d');
    
  //   // Create a new jsPDF instance
  //   const pdf = new jsPDF();
    
  //   // Use html2canvas to capture the canvas elements as images
  //   html2canvas(chartCanvas).then((canvas) => {
  //     // Add the canvas image to the PDF document
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 100, 100);
    
  //     // Use html2canvas to capture the second canvas element as an image
  //     html2canvas(chartCanvas2).then((canvas2) => {
  //       // Add the second canvas image to the PDF document
  //       pdf.addImage(canvas2.toDataURL('image/png'), 'PNG', 110, 10, 100, 100);
    
  //       // Save the PDF document
  //       pdf.save('charts.pdf');
  //     });
  //   });
  // }
  // else
  // {
  //   console.error('Element with ID "chart-container" not found');
  // }
}
}
