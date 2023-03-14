import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private router:Router,private http:HttpClient,public spinner:NgxSpinnerService,private categoryService:CategoryService) { }
  trainers:any=[]
  GetAllTrainers(){
    this.spinner.show()
    this.http.get("https://localhost:44391/api/Trainer/GetAllTrainers").subscribe(
      {
        next:(res)=>{this.trainers=res
        this.spinner.hide()},
        error:(err)=>{this.spinner.hide()
        console.log(err);
        }
      }
    )
  }
  getAllUsersTrainers(){
    
  }
}
