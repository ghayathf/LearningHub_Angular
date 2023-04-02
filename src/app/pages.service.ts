import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(public spinner: NgxSpinnerService, public http: HttpClient, public toaster: ToastrService) { }


  updatedFile?: any
  async UpdateAboutus(obj: any) {
    return new Promise<void>(async (resolve, reject) => {
    await this.GetAllAbout()
    this.updatedFile = this.abouts[0].aboutimage;

    if (this.Filepath != "")
      obj.aboutimage = this.Filepath;
    else if (this.abouts[0].aboutimage != "") {
      obj.aboutimage = this.abouts[0].aboutimage;

    }



      this.http.put("https://localhost:44391/api/Aboutus/UpdateAbout", obj).subscribe({
        next: () => {
          this.toaster.success("Updated Successfuly")
          resolve();

        },
        error: (err) => {
          console.log(err);

        }
      })
    })
  }

  abouts: any = []
  GetAllAbout() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44391/api/Aboutus/gatAllAbouts").subscribe(
        (res) => {
          this.abouts = res
          this.spinner.hide()
          resolve()
        },
        (err) => {
          console.log(err);
          this.spinner.hide()
        }
      )
    })
  }

  Filepath = "";

  UploadImage(Fille: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44391/api/Aboutus/UploadImage", Fille).subscribe(
        {
          next: (res: any) => {
            this.spinner.hide()
            this.Filepath = res.aboutimage;
            resolve()

          },
          error: () => {
            this.spinner.hide();
          }
        }


      )
    })
  }


  Filepath2 = "";

  UploadLogo(Fille: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44391/api/Home/UploadImage", Fille).subscribe(
        {
          next: (res: any) => {
            this.spinner.hide()
            this.Filepath2 = res.logo;
            resolve()
          },
          error: () => {
            this.spinner.hide();
          }
        }


      )
    })
  }


  homes: any = []
  GetAllHome() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44391/api/Home/GetAllHomeInformatio").subscribe(
        (res) => {
          this.homes = res
          this.spinner.hide()
          resolve()
        },
        (err) => {
          this.spinner.hide()
        }
      )
    })
  }


  updatedFile2?: any
  async UpdateHome(obj: any) {
    return new Promise<void>(async (resolve, reject) => {
    await this.GetAllHome()
    this.updatedFile2 = this.homes[0].logo;

    if (this.Filepath2 != "")
      obj.logo = this.Filepath2;
    else if (this.homes[0].logo != "") {
      obj.logo = this.homes[0].logo;

    }



      this.http.put("https://localhost:44391/api/Home/UpdateHomePage", obj).subscribe({
        next: () => {
          this.toaster.success("Updated Successfuly")
          resolve();
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }

  lengths: any = []
  GetLengths() {
    return new Promise<void>((resolve, reject) => {
      
      this.http.get("https://localhost:44391/api/Home/Lengths").subscribe(
        (res) => {
          this.lengths = res
          this.spinner.hide()
          resolve()
        },
        (err) => {
          this.spinner.hide()
        }
      )
    })
  }




}
