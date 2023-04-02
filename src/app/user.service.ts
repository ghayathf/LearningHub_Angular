import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router:Router,private http:HttpClient,public spinner:NgxSpinnerService,public toaster:ToastrService,public auth:AuthGuard) { }

  users:any=[]
  async getAllUsers(){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/User/GetAllUsers").subscribe(
      {
        next:(res)=>{this.users=res
        this.spinner.hide()
        resolve()
                    },
        error:(err)=>{this.spinner.hide()
        console.log(err);
          }
        }
      )
    }
  )
}
  user:any
  async getUserById(userId:any){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/User/GetUserByID/"+userId).subscribe(
      {
        next:(res)=>{
        this.user = res
        this.spinner.hide()
        resolve()
    },
        error:(err)=>{this.spinner.hide()
        console.log(err);
        }
      }
    )
  }
    )
  }
  DeleteUser(userId: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.delete("https://localhost:44391/api/User/DeleteUser/"+userId).subscribe(
        {
          next: () => {
            this.spinner.hide();
            // this.toaster.success("User Deleted Successfuly");
            resolve();
          },
          error: () => {
            this.spinner.hide();
            this.toaster.error("Error");
          }
        }
      )
    }
  )
}
CreateUser(user: any): Promise<any> {

  return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    this.http.post("https://localhost:44391/api/User/CreateUser", user).subscribe(
      {
        next: () => {
          this.getAllUsers()
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
async UpdateUser(user: any): Promise<any> {
await this.getUserById(user.userid)
  if(this.ImgaeName!=null)
user.imagename=this.ImgaeName
else
user.imagename=this.user.imagename

console.log(user.imagename)
  return new Promise<void>((resolve, reject) => {
    this.spinner.show();
    this.http.put("https://localhost:44391/api/User/UpdateUser", user).subscribe(
      {

        next: () => {
          this.spinner.hide();
          this.toaster.success("User Account Updated Successfuly");
          resolve();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
          this.toaster.error("Error");
        }
      }
    )
  }
  );
}
ImgaeName :any;
  UploadImage(imageFile: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {

    this.http.post("https://localhost:44391/api/User/UploadImage", imageFile).subscribe(
      {
        next: (res: any) => {
          this.spinner.hide()
          this.ImgaeName = res.imagename;
          resolve()
        },
        error: () => { }
      }
    )})
  }
}
