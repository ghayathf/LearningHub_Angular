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
    task.taskstatus = 0;
    task.taskfile = this.TaskFile;
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.post("https://localhost:44391/api/Task/CreateNewTask", task).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Task Created Successfuly");
            resolve();
            debugger
          },
          error: () => {
            this.spinner.hide();
            this.toaster.error("Error");
            debugger
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


  deleteTask(taskId: number) {
    return new Promise<void>((resolve, reject) => {
      this.http.delete("https://localhost:44391/api/Task/DeleteTask/" + taskId).subscribe(
        {
          next: () => {
            this.spinner.hide()
            this.toaster.success("Deleted Task Successfuly");
            resolve()
          },
          error: () => {
            this.spinner.hide()
            this.toaster.success("Error");
          }
        }
      )
    })

  }

  updatedTask?: any
  async UpdateTaskFile(task: any) {
    await this.GetTaskById(task.taskid)
    this.updatedTask = this.Task.taskfile;

    if (this.TaskFile != "")
      task.taskfile = this.TaskFile;
    else if (this.Task.taskfile != "") {
      task.taskfile = this.Task.taskfile;

    }

    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.put("https://localhost:44391/api/Task/UpdateTask", task).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Task Updated Successfully");
            resolve();
          },
          error: () => {
            this.spinner.hide();
            this.toaster.error("Try again");

          }


        }
      )
    })

  }


}
