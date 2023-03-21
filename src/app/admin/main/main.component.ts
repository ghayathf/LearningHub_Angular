import { Component } from '@angular/core';
import { TrainerService } from 'src/app/trainer.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
constructor(public trainerService:TrainerService) {

}
ngOnInit(){
this.trainerService.GetAllTrainers()
}
title2 = 'ng2-charts-demo';

// Pie
public pieChartOptions: ChartOptions<'pie'> = {
  responsive: false,
};
public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
public pieChartDatasets = [ {
  data: [ 300, 500, 100 ]
} ];
public pieChartLegend = true;
public pieChartPlugins = [];
title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


}
