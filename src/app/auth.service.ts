import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toaster: ToastrService,private router:Router) { }

  login(user:any){
    return new Promise<void>((resolve, reject) => {
    const header = {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    }
    const Options={
      headers:new HttpHeaders(header)
    }


    this.spinner.show()
    this.http.post("https://localhost:44391/api/User/login",user , Options).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          let data : any = jwt_decode(res)
          console.log(data);

          localStorage.setItem('token',res)
          localStorage.setItem('user',JSON.stringify(data))


          this.spinner.hide()
          if (data.RoleId == 1){
            this.router.navigate(["Admin/"]);
          }
          if (data.RoleId == 2){
            this.router.navigate([""]);
          }

          resolve()
        },
        error:(err)=>{
          this.spinner.hide()
          console.log(err);

          this.toaster.error("Invalid username or password")
        }
      }
    )})
  }
}
