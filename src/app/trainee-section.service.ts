import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TraineeSectionService {

  constructor(private router: Router, private http: HttpClient, public spinner: NgxSpinnerService, public toaster: ToastrService) { }

  Trainees: any = []
  CreateTraineeSection(Trainee: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44391/api/TraineeSection/CreateTraineeSection", Trainee).subscribe({
        next: (res) => {
          this.Trainees = res;
          this.spinner.hide();
          this.toaster.success("Trainee Added Successfuly");
          resolve();
          debugger
        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);
          debugger

        }
      })
    })

  }
  TraineeSections:any = []
  GetAllTraineeSection(){
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/TraineeSection/GetAllTraineeSections").subscribe({
        next: (res) => {
          this.TraineeSections = res;
          this.spinner.hide();
          resolve();

        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);
        }
      })
    })
  }
  allTrainees:any = []
  GetAllTrainees(){
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/Trainee/gatAllTrainees").subscribe({
        next: (res) => {
          this.allTrainees = res;
          this.spinner.hide();
          resolve();
        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);
        }
      })
    })
  }
}
