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
    this.spinner.show();
    this.http.get("https://localhost:44391/api/ContactUs/GetAllContactUs").subscribe(
      {
        next: (res) => {
          this.ListOfMessage = res;
          this.spinner.hide();

        },
        error: () => {
          this.spinner.hide();
          this.toaster.error("Error!!");
        }
      }
    )
  }
}
