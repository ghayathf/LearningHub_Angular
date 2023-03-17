import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toaster: ToastrService) { }

  ListOfMessage: any = [];
  GetAllMessage() {
    return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    this.http.get("https://localhost:44391/api/ContactUs/GetAllContactUs").subscribe(
      {
        next: (res) => {
          this.ListOfMessage = res;
          this.spinner.hide();
          resolve()
        },
        error: () => {
          this.spinner.hide();
          this.toaster.error("Error!!");
        }
      }
    )})
  }
  counter: number = 0;

  CreateMessage(message: any) {
    this.spinner.show();
    this.http.post("https://localhost:44391/api/ContactUs/CreateContactUs", message).subscribe(
      {
        next: () => {
          this.counter++;
          this.spinner.hide();
          this.toaster.success("Email sent");
          console.log(this.counter);


        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("error");
          console.log(err);

        }
      }
    )
  }

  DeleteMessage(messageId: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.delete("https://localhost:44391/api/ContactUs/DeleteContactUs/" + messageId).subscribe(
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

}
