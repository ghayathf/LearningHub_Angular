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
    this.http.get("https://localhost:44391/api/Section/GetAllSections").subscribe(
      (res) => { this.sections = res },
      (err) => {
        console.log(err);
      }
    )
  }
  CreateSection(newSection:any){
    return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    this.http.post("https://localhost:44391/api/Section/CreateSection",newSection).subscribe(
      {
        next:()=>{this.spinner.hide()
          this.toaster.success("Section Created Successfuly");
          resolve();
         },
        error:()=>{  this.spinner.hide();
          this.toaster.error("Error");}
      }
    )
  })}
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
  ngOnInit(): void {
   
  }



}