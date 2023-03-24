import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(public spinner: NgxSpinnerService, public http: HttpClient, public toaster: ToastrService) { }

  DeleteMaterial(MaterialId: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.delete("https://localhost:44391/api/Material/DeleteMaterial/" + MaterialId).subscribe(
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
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get("https://localhost:44391/api/Material/gatAllMaterials").subscribe(
        (res) => {
          this.materials = res
          this.spinner.hide();
          resolve()
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      )
    })
  }
  Material: any
  MatId?: any
  num?: number
  GetMaterialById(MaterialId: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.hide();
      this.http.get("https://localhost:44391/api/Material/GetMaterialById/" + MaterialId).subscribe(
        {
          next: (res) => {
            this.Material = res
            this.spinner.hide();
            resolve()
          },
          error: (err) => {
            console.log(err);
            this.spinner.hide();
          }
        }


      )
    })
    this.MatId = MaterialId
  }
  CreateMaterial(material: any) {
    material.filepath = this.Filepath;
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
            debugger
          }
        }
      )
    })
  }
  searchedMat: any = []
  searchMaterials(startDate?: Date, endDate?: Date): Observable<any> {
    const body: { [key: string]: any } = {};
    if (startDate) {
      body['DateFrom'] = startDate.toISOString();
    }
    if (endDate) {
      body['DateTo'] = endDate.toISOString();
    }
    return this.http.post("https://localhost:44391/api/Material/SearchMaterials", body);
  }
  getItemsBetweenDates(startDate: Date, endDate: Date) {
    this.searchedMat = this.materials.filter(
      (item: { date: { getTime: () => number; }; }) =>
        item.date.getTime() >= startDate.getTime() &&
        item.date.getTime() <= endDate.getTime()
    );

  }

  Filepath = "";

  UploadFile(Fille: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44391/api/Material/UploadMaterial", Fille).subscribe(
        {
          next: (res: any) => {
            this.spinner.hide()
            this.Filepath = res.filepath;
            resolve()
          },
          error: () => {
            this.spinner.hide();
          }
        }


      )
    })
  }

  updatedFile?: any
  async UpdateMaterial(material: any) {
    await this.GetMaterialById(material.materialid)
    this.updatedFile = this.Material.filepath;

    if (this.Filepath != "")
      material.filepath = this.Filepath;
    else if (this.Material.filePath != "") {
      material.filepath = this.Material.filePath;

    }

    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.put("https://localhost:44391/api/Material/UpdateMaterial", material).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Material Updated Successfully");
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
}
