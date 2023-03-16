import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(public spinner:NgxSpinnerService,public http:HttpClient,public toaster:ToastrService) { }

  DeleteMaterial(MaterialId: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.delete("https://localhost:44391/api/Material/DeleteMaterial/"+MaterialId).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Deleted Successfuly");
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
  materials: any = []
  GetAllMaterial() {
    this.spinner.show();
    this.http.get("https://localhost:44391/api/Material/gatAllMaterials").subscribe(
      (res) => {
        this.materials = res
        this.spinner.hide();

      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    )
  }
  Material:any
  MatId?:any
  num?: number
  GetMaterialById(MaterialId:number){
    this.http.get("https://localhost:44391/api/Material/GetMaterialById/"+MaterialId).subscribe(
      {
        next: (res) => {
          this.Material = res
          this.spinner.hide();

        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        }
      }


    )
    this.MatId=MaterialId
  }
  CreateMaterial(material: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.post("https://localhost:44391/api/Material/CreateMaterial", material).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Material Created Successfuly");
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
  searchedMat:any = []
   searchMaterials(startDate?: any, endDate?: any) {
    const body: { [key: string]: any } = {};
    if (startDate) {
      body['DateFrom'] = startDate;
    }
    if (endDate) {
      body['DateTo'] = endDate;
    }
    this.http.post("https://localhost:44391/api/Material/SearchMaterials",body).subscribe(
      {
        next: (res) => {

          this.spinner.hide();
          this.toaster.success("Successfuly");
          this.searchedMat = res
        },
        error: () => {
          this.spinner.hide();
          this.toaster.error("Error");

        }
      }
    )
  }


}
