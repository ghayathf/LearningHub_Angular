import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private router: Router, private toaster: ToastrService) { }


  tasks: any = []
  GetAllTasks() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/Task/GetAllTasks").subscribe(
        (res) => {
          this.tasks = res
          this.spinner.hide()
          resolve();
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      )
    })
  }
  solutions:any
  GetAllSolutions() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/Solution/GetAllSolutions").subscribe(
        (res) => {
          this.solutions = res
          this.spinner.hide()
          resolve();
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      )
    })
  }

}
