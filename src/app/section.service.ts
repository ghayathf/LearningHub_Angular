import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private router: Router, private http: HttpClient, public spinner: NgxSpinnerService,public toaster:ToastrService) { }

  sections: any = []
  GetAllSections() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/Section/GetAllSections").subscribe(
      (res) => { this.sections = res
      this.spinner.hide()
    resolve(); },
      (err) => {
        console.log(err);
      }
    )})
  }
  CreateSection(newSection:any){
    return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    this.http.post("https://localhost:44391/api/Section/CreateSection",newSection).subscribe(
      {
        next:()=>{this.spinner.hide()
          this.toaster.success("Section Created Successfuly");
          resolve();
          debugger
         },
        error:()=>{  this.spinner.hide();
          this.toaster.error("Error");}
      }
    )
  })



}
  DeleteSection(sectionId: number) {

    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.delete("https://localhost:44391/api/Section/DeleteSection/"+sectionId).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Section Deleted Successfuly");

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
  section:any
  selectedTraineeId:any
  GetSectionById(sectionId:number){
    return new Promise<void>((resolve, reject) => {
    this.spinner.show()
    this.http.get("https://localhost:44391/api/Section/GetSectionByID/"+sectionId).subscribe(
      {
        next:(res)=>
        {this.section=res
          this.spinner.hide()
          resolve()
        },
        error:(err)=>{console.log(err);
        }
      }
    )})
  }
  async UpdateSection(section: any) {

    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.put("https://localhost:44391/api/Section/UpdateSection", section).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Section Updated Successfully");
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

async GenerateCertificate(type:number,sectionId:number){
  return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    this.http.post(`https://localhost:44391/api/Admin/GenerateCertificate/${type}/${sectionId}`,{}).subscribe(
      {
        next: () => {
          this.spinner.hide();
          this.toaster.success("Certificates Generated Successfully");
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

Comments: any = []
  GetAllComments() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/Comments/GetAllComments").subscribe(
      (res) => {
        this.Comments = res
      this.spinner.hide()
    resolve(); },
      (err) => {
        console.log(err);
      }
    )})
  }
  CreateComment(Comment:any){
    return new Promise<void>((resolve, reject) => {
    this.http.post("https://localhost:44391/api/Comments/CreateComment",Comment).subscribe(
      {
        next:()=>{
          this.toaster.success("Comment Added");
          resolve();
         },
        error:()=>{

          this.toaster.error("Error");}
      }
    )
  })
}
myComments: any = []
  GetCommentsBySection(secId:any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/Comments/GetCommentsBySecId/"+secId).subscribe(
      (res) => {
        this.myComments = res
      this.spinner.hide()
    resolve(); },
      (err) => {
        console.log(err);
      }
    )})
  }
  mySec: any = []
  GetSectionInfo(secId:any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/Section/GetSecInfo/"+secId).subscribe(
      (res) => {
        this.mySec = res
      this.spinner.hide()
    resolve(); },
      (err) => {
        console.log(err);
      }
    )})
  }
  currentts: any = []
  GettsInfo(secId:any,traineeId:any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/Section/GetTSInfos/"+secId+"/"+traineeId).subscribe(
      (res) => {
        this.currentts = res
      this.spinner.hide()
    resolve();
    debugger
  },
      (err) => {
        console.log(err);
        debugger
      }
    )})
  }
}
