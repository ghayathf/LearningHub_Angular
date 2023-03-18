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
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private router: Router, private toaster: ToastrService) {

    this.tr = []
  }



  CreateUser(User: any) {
    this.spinner.show();
    User.roleId = 2;
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
    this.tr = this.users.filter((x: { roleId: number; }) => x.roleId == 2)
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

        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);

        }
      }
    )
  }

  filterData: any = [];

  GetAllTraineeUser() {

    this.spinner.show();
    this.http.get("https://localhost:44391/api/Trainee/GetAllTraineeUser").subscribe(
      {
        next: (res) => {
          this.spinner.hide();
          this.filterData = res;

        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);

        }
      }
    )

  }

  userid: any;

  // DeleteRequest(requestId: any) {
  //   this.spinner.show();
  //   this.userid = requestId;
  //   return new Promise<void>((resolve, reject) => {
  //     this.http.delete("https://localhost:44391/api/User/DeleteUser/" + requestId).subscribe(
  //       {
  //         next: () => {
  //           this.spinner.hide();
  //           this.toaster.success("Request Deleted Successfuly");
  //           resolve();
  //         },
  //         error: () => {
  //           this.spinner.hide();
  //           this.toaster.error("error");
  //         }
  //       }
  //     )
  //   })


  // }


  // async UpdateRequest(Request: any) {
  //   return new Promise<void>((resolve, reject) => {
  //     this.spinner.show();
  //     Request.registerstatus = 1;
  //     Request.userid = this.userid;
  //     this.http.put("https://localhost:44391/api/Trainee/UpdateTrainee", Request).subscribe(
  //       {
  //         next: () => {
  //           this.spinner.hide();
  //           this.toaster.success("Accepted");
  //           resolve();
  //         },
  //         error: () => {
  //           this.spinner.hide();
  //           this.toaster.error("Try again");

  //         }


  //       }
  //     )
  //   })

  // }

}
