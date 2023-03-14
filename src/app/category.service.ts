import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toaster: ToastrService) { }
  categories: any = []
  GetAllCategories() {
    this.spinner.show();
    this.http.get("https://localhost:44391/api/Categories/GetAllCategories").subscribe(
      (res) => {
        this.categories = res
        this.spinner.hide();

      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    )
  }

  category: any
  num?: number
  GetCategoryById(categoryid: number) {
    this.spinner.show();
    this.http.get("https://localhost:44391/api/Categories/GetCategoryById/" + categoryid).subscribe(
      {
        next: (res) => {
          this.category = res
          this.spinner.hide();

        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        }
      }


    )
  }
  CreateCategory(course: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.post("https://localhost:44391/api/Categories/CreateCategory", course).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Create Category Successfuly");
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
  GetSelectedCategory()
  {
    return this.category;
  }
}
