import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toaster: ToastrService) { }

  Solutions: any = []
  GetAllSolution() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44391/api/Solution/GetAllSolutions").subscribe(
        (res) => {
          this.Solutions = res
          this.spinner.hide()
          resolve()
        },
        (err) => {
          console.log(err);
          this.spinner.hide()
        }
      )
    })
  }

  solutionByIDD: any
  GetSolutionById(SId: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44391/api/Solution/GetSolutionByID/" + SId).subscribe(
        {
          next: (res) => {
            this.solutionByIDD = res
            this.spinner.hide()
            resolve()
          },
          error: (err) => {
            this.spinner.hide()
            console.log(err);
          }
        }
      )
    })
  }

  GiveSolutionMark(MarkPackage:any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.put("https://localhost:44391/api/Solution/EnterSolutionMark/" + MarkPackage.solutionid +"/" + MarkPackage.solutionmark,null).subscribe(
        {
          next: (res) => {
            this.spinner.hide()
            this.toaster.success("Mark has been added Successfuly");
            resolve()
          },
          error: (err) => {
            this.spinner.hide()
            this.toaster.error("Try Again");
            console.log(err);
            debugger
          }
        }
      )
    })
  }
}
