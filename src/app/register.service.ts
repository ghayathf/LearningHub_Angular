import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import emailjs from '@emailjs/browser';


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

  DeleteRequest(userid: any) {
    this.spinner.show();

    return new Promise<void>((resolve, reject) => {
      this.http.delete("https://localhost:44391/api/User/DeleteUser/" + userid).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Request Deleted Successfuly");
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

  User: any;
  GetUserById(userid: number) {
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/User/GetUserByID/" + userid).subscribe({
      next: (res) => {
        this.User = res;
        resolve();
      },
      error: (err) => {
        console.log(err);

      }
    })})
  }
  user2: any;
  async UpdateRequest(Request: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();


      Request.registerstatus = 1;



      this.http.put("https://localhost:44391/api/Trainee/UpdateTrainee", Request).subscribe(
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
    })

  }

  AcceptedTrainee: any = [];

  GetAllAcceptedTrainee() {

    this.spinner.show();
    this.http.get("https://localhost:44391/api/Trainee/GetAllAccepted").subscribe(
      {
        next: (res) => {
          this.spinner.hide();
          this.AcceptedTrainee = res;

        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);

        }
      }
    )

  }

  Registers: any = []

  async getAllRegisterd() {
    this.spinner.show()
    this.http.get("https://localhost:44391/api/User/GetAllUsers").subscribe(
      {
        next: (res) => {
          this.Registers = res
          this.spinner.hide();

        },
        error: (err) => {
          this.spinner.hide()
          console.log(err);
        }
      }
    )
  }

async AcceptEmail(object:any){
  return new Promise<void>((resolve, reject) => {
  emailjs.send('service_6xav48r', 'template_ge682oo', object,  'y8NEJ_GRB1cDhZfJM')
  .then(
  (response: any) => {
    console.log("SUCCESS!", response.status, response.text);
    resolve();
    debugger
    },
    (error: any) => {
    console.log("FAILED!", error);
    debugger
   });
  })
}
async RejectEmail(object:any){
  return new Promise<void>((resolve, reject) => {
  emailjs.send('service_6xav48r', 'template_tudzrm5', object,  'y8NEJ_GRB1cDhZfJM')
  .then(
  (response:any) => {debugger
    console.log("SUCCESS!", response.status, response.text);
    resolve();
    },
    (error:any) => {debugger
    console.log("FAILED!", error);
   });
  })
}
}
