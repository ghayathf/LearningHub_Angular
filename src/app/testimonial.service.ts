import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private router: Router, private http: HttpClient, public spinner: NgxSpinnerService, public toaster: ToastrService) { }

  testimonials: any = []
  GetAllTestimonilas() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get("https://localhost:44391/api/Testimonial/GetAllTestimonials").subscribe(
        (res) => {
          this.testimonials = res
          this.spinner.hide();
          resolve();
        },
        (err) => {
          console.log(err);
          this.spinner.hide();

        })
    })

  }

  Acceptedtestimonials: any = []
  GetAllAcceptedTestimonilas() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get("https://localhost:44391/api/Testimonial/GetAllAcceptedTestimonial").subscribe(
        (res) => {
          this.testimonials = res
          this.spinner.hide();
          resolve();
        },
        (err) => {
          console.log(err);
          this.spinner.hide();

        })
    })

  }





  DeleteMessage(messageId: number) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.delete("https://localhost:44391/api/Testimonial/DeleteTestimonial/" + messageId).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Message Deleted Successfuly");
            resolve();
          },
          error: () => {
            this.spinner.hide();
            this.toaster.error("error");
          }
        }
      )
    })
  }
  CreateTestimonial(message: any) {
    this.spinner.show();
    message.testimonialstatus=0;
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44391/api/Testimonial/CreateTestimonial" , message).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Feedback sent Successfully");
            resolve();
          },
          error: () => {
            this.spinner.hide();
            this.toaster.error("Try Again");
          }
        }
      )
    })
  }
  async UpdateRequest(Request: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      Request.testimonialstatus = 1;
      this.http.put("https://localhost:44391/api/Testimonial/UpdateTestimonial", Request).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Accepted");
            resolve();
          },
          error: () => {
            this.spinner.hide();
            this.toaster.error("Try again");
          }
        }
      )
    }
    )
  }

}
