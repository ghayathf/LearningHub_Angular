import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './category.service';
import emailjs from '@emailjs/browser';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  tr:any
  constructor(private router:Router,private http:HttpClient,public spinner:NgxSpinnerService,private categoryService:CategoryService,public toaster:ToastrService) { this.tr=[]}
  trainers:any=[]
  async GetAllTrainers(){
    return new Promise<void>((resolve, reject) => {
    this.spinner.show()
    this.http.get("https://localhost:44391/api/Trainer/GetAllTrainers").subscribe(
      {
        next:async (res)=>{
          this.spinner.hide()
          await this.getAllUsersTrainers()
          this.filterUsers()
          this.trainers=res

  resolve()},
        error:(err)=>{this.spinner.hide()
        console.log(err);
        }
      }
    )})
  }
  lastid:any
  users:any=[]
  async getAllUsersTrainers(){

    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/User/GetAllUsers").subscribe(
      {
        next:(res)=>{this.users=res
        this.spinner.hide()
        const maxId = Math.max(...this.tr.map((trainer: { userid: any; }) => trainer.userid));
        this.lastid = maxId
        resolve()
    },
        error:(err)=>{this.spinner.hide()
        console.log(err);
        }
      }
    )})
  }
filterUsers()
{
  this.tr = this.users.filter((x: { roleId: number; }) => x.roleId == 3)
}
getTrainerUserIdByUserId(paramUserId: number): number {
  const filteredTrainers = this.trainers.filter((trainer: { user_Id: number; }) => trainer.user_Id === paramUserId);
  if (filteredTrainers.length > 0) {
    return filteredTrainers[0].userId;
  } else {
    return 0
  }
}

CreateTrainer(trainer: any) {
  return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    this.http.post("https://localhost:44391/api/Trainer/CreateTrainer", trainer).subscribe(
      {
        next: () => {
          this.spinner.hide();
          this.toaster.success("Trainer Account Created Successfuly");

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
lastUser:any

CreateUser(user: any): Promise<any> {

  return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    user.roleId = 3
    this.http.post("https://localhost:44391/api/User/CreateUser", user).subscribe(
      {
        next: () => {
          this.GetAllTrainers();
          this.spinner.hide();
          this.toaster.success("User Account Created Successfuly");
          resolve();

        },
        error: () => {
          this.spinner.hide();
          this.toaster.error("Error");
        }
      }
    )
  });
}

DeleteTrainer(trainerId: number) {
  return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    this.http.delete("https://localhost:44391/api/Trainer/DeleteTrainer/"+trainerId).subscribe(
      {
        next: () => {
          this.spinner.hide();
          this.toaster.success("Trainer Deleted Successfuly");
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
select:number=0
DeleteUser(trainerId: number) {
  this.select = this.getTrainerUserIdByUserId(trainerId);
  return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    this.http.delete("https://localhost:44391/api/User/DeleteUser/"+trainerId).subscribe(
      {
        next: () => {
          this.spinner.hide();
          this.toaster.success("User Deleted Successfuly");
          this.DeleteTrainer(this.select)
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
trainer:any
GetTrainerById(trainerId:number){
  this.spinner.show()
  this.http.get("https://localhost:44391/api/Trainer/GetTrainerByID/"+trainerId).subscribe(
    {
      next: (res) => {
        this.trainer = res
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      }
    }
  )
}


async AbsenceEmail(object:any){
  debugger
  return new Promise<void>((resolve, reject) => {
  emailjs.send('service_fkbaj5y', 'template_k96j9a8', object,  'BvT6kBttjGdEkCxOZ')
  .then(
  (response: any) => {
    debugger
    console.log("SUCCESS!", response.status, response.text);
    resolve();
    
    },
    (error: any) => {
      debugger
    console.log("FAILED!", error);
    
   });
  })
}
}
