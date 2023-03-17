import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  tr: any;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private router: Router) {

    this.tr = []
  }



  CreateUser(User: any) {
    this.spinner.show();
    User.role_Id = 2;
    this.http.post("https://localhost:44391/api/User/CreateUser", User).subscribe(
      {
        next: () => {
          this.spinner.hide();

          this.getAllUsers();


        },
        error: () => {
          this.spinner.hide();
        }
      }
    )
  }

  users: any = []
  lastid: any;
  async getAllUsers() {
    this.spinner.show()
    this.http.get("https://localhost:44391/api/User/GetAllUsers").subscribe(
      {
        next: (res) => {
          this.users = res
          this.spinner.hide();
          this.filterUsers();
          const maxId = Math.max(...this.tr.map((trainer: { userid: any; }) => trainer.userid));
          this.lastid = maxId
        },
        error: (err) => {
          this.spinner.hide()
          console.log(err);
        }
      }
    )
  }

  filterUsers() {
    this.tr = this.users.filter((x: { role_Id: number; }) => x.role_Id == 2)
  }

  Trainee: any = [];
  GetAllTrainee() {

    this.http.get("https://localhost:44391/api/Trainee/gatAllTrainees").subscribe(
      {
        next: (res) => {
          this.Trainee = res;
          this.spinner.hide();
        },
        error: () => {
          this.spinner.hide();
        }
      }
    )
  }

  CreateTrainne(Trainee: any) {
    this.spinner.show();
    Trainee.registerstatus = -1;
    this.http.post("https://localhost:44391/api/Trainee/InsertTrainee", Trainee).subscribe(
      {
        next: () => {
          this.spinner.hide();
          this.router.navigate(['/Auth/register']);
        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);

        }
      }
    )
  }
}
