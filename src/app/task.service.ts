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

  Task: any
  GetTaskById(id: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44391/api/Task/GetTaskById/" + id).subscribe(
        {
          next: (res) => {
            this.Task = res
            this.spinner.hide()
            resolve()
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    })
  }

  CreateTask(task: any) {
    task.taskfile = this.TaskFile;
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.post("https://localhost:44391/api/Task/CreateNewTask", task).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Task Created Successfuly");
            resolve();
          },
          error: () => {
            this.spinner.hide();
            this.toaster.error("Error");
            
          }
        }
      )
    })
  }

  
  TaskFile = "";

  UploadTask(Taskkk: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44391/api/Task/UploadTask", Taskkk).subscribe(
        {
          next: (res: any) => {
            this.spinner.hide()
            this.TaskFile = res.taskfile;
            resolve()
          },
          error: () => {
            this.spinner.hide();
          }
        }


      )
    })
  }

}
