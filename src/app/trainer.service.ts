import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  tr:any
  constructor(private router:Router,private http:HttpClient,public spinner:NgxSpinnerService,private categoryService:CategoryService) { this.tr=[]}
  trainers:any=[]
  GetAllTrainers(){
    this.spinner.show()
    this.http.get("https://localhost:44391/api/Trainer/GetAllTrainers").subscribe(
      {
        next:(res)=>{this.trainers=res

      this.getAllUsersTrainers()
    this.filterUsers()
    this.spinner.hide()},
        error:(err)=>{this.spinner.hide()
        console.log(err);
        }
      }
    )
  }
  users:any=[]
  getAllUsersTrainers(){
    this.spinner.show()
    this.http.get("https://localhost:44391/api/User/GetAllUsers").subscribe(
      {
        next:(res)=>{this.users=res
        this.spinner.hide()},
        error:(err)=>{this.spinner.hide()
        console.log(err);
        }
      }
    )
  }

filterUsers()
{
  this.tr = this.users.filter((x: { role_Id: number; }) => x.role_Id == 3)
}

}
