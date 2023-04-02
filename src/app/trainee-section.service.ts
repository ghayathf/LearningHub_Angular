import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { STRING_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraineeSectionService {

  constructor(private router: Router, private http: HttpClient, public spinner: NgxSpinnerService, public toaster: ToastrService) { }

  Trainees: any = []
  CreateTraineeSection(Trainee: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44391/api/TraineeSection/CreateTraineeSection", Trainee).subscribe({
        next: (res) => {
          this.Trainees = res;
          this.spinner.hide();
          this.toaster.success("Trainee Added Successfuly");
          resolve();

        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);


        }
      })
    })

  }

  TSIDD: any
  GetTSById(id: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44391/api/TraineeSection/GetTraineeSectionByID/" + id).subscribe(
        {
          next: (res) => {
            this.TSIDD=res;
            this.spinner.hide()
            resolve()
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    })
  }
  TraineeSections:any = []
  GetAllTraineeSection(){
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/TraineeSection/GetAllTraineeSections").subscribe({
        next: (res) => {
          this.TraineeSections = res;
          this.spinner.hide();
          resolve();
        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);
        }
      })
    })
  }
  allTrainees:any = []
  GetAllTrainees(){
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/Trainee/gatAllTrainees").subscribe({
        next: (res) => {
          this.allTrainees = res;
          this.spinner.hide();
          resolve();
        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);
        }
      })
    })
  }
  secTrainees:any=[]
  GetAllSecTrainees(secId:any){
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/Trainee/GetSecTrainees/"+secId).subscribe({
        next: (res) => {
          this.secTrainees = res;
          this.spinner.hide();
          resolve();
        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);
        }
      })
    })
  }
  absenceobj:any
  currDate?:any
  CreateAbsence(tsid:any){
    this.currDate = new Date(Date.now())
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.currDate, 'yyyy-MM-ddTHH:mm:ss');
    this.absenceobj = {
      tsid2:tsid,
      attendancedate:formattedDate
    }
    this.absenceobj.attendancedate = String(this.absenceobj.attendancedate)
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44391/api/TakeAttendance/CreateAbsence",this.absenceobj).subscribe({
        next: () => {
          this.spinner.hide();
          this.toaster.success("Absence created successfully");
          resolve();
        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);
        }
      })
    })
  }

  CreateAttendance(tsid:any){
    this.currDate = new Date(Date.now())
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.currDate, 'yyyy-MM-ddTHH:mm:ss');
    this.absenceobj = {
      tsid2:tsid,
      attendancedate:formattedDate
    }
    this.absenceobj.attendancedate = String(this.absenceobj.attendancedate)
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44391/api/TakeAttendance/CreateAttendance",this.absenceobj).subscribe({
        next: () => {
          this.spinner.hide();
          this.toaster.success("attendance created successfully");
          resolve();
        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);
        }
      })
    })
  }
  certificatesFlag:any =false
  certificate:any
  myCertificate:any =[]
  getAllCertificates(id:number,secID:number){
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/Certificate/GetAllCertificates").subscribe({
        next: (res) => {
          this.certificate = res;
          this.myCertificate = this.certificate.find((x: { t_S_Id: number; })=>x.t_S_Id == id)
          if(this.myCertificate != null)
          this.certificatesFlag = true
          this.spinner.hide();


          if(this.certificatesFlag){this.GetAbsentTrainees(secID)}
          debugger

          resolve();
        },
        error: (err) => {
          this.spinner.hide();
          // this.toaster.error("Error Try Again");
          console.log(err);
        }
      })
    })
  }
  check:any
  GetAbsentTrainees(id:number){
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/TakeAttendance/GetAbsentTrainees/"+id).subscribe({
        next: (res) => {
         this.check=res;
         this.check.forEach((element:any) => {
          if(element.tsid2 == this.certificate.t_S_Id) {
            this.certificatesFlag = false
           }
         });
          resolve();
          debugger
        },
        error: (err) => {

          console.log(err);
        }
      })
    })
  }
  currentTrainee:any=[]

  GetAllInfoAboutTrainee(usid:any){
    //this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44391/api/Trainee/GetSecTraineesInfos/"+usid).subscribe({
        next: (res) => {
          this.currentTrainee = res;

          //this.spinner.hide();
          resolve();
        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error("Error Try Again");
          console.log(err);
        }
      })
    })
  }
}
