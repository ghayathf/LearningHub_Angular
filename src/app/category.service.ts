import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toaster: ToastrService) { }
  categories: any
  GetAllCategories() {

    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44391/api/Categories/GetAllCategories").subscribe(
      (res) => {
        this.categories = res
        this.spinner.hide();
        resolve()
      },
      (err) => {
        console.log(err);
        this.spinner.hide();

      })})

  }
  category: any
  categoryID?: any
  num?: number
  async GetCategoryById(categoryid: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show()
      this.http.get("https://localhost:44391/api/Categories/GetCategoryById/" + categoryid).subscribe(
        {
          next: (res) => {
            this.category = res
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
    this.categoryID = categoryid

  }

  CreateCategory(category: any) {
    category.categoryimage = this.ImgaeName;
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.post("https://localhost:44391/api/Categories/CreateCategory", category).subscribe(
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
  DeleteCategory(categoryId: number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.delete("https://localhost:44391/api/Categories/DeleteCategory/" + categoryId).subscribe(
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
updatedCategory?:any
updatedImg?:string=''
  async UpdateCategory(Category: any) {
   await this.GetCategoryById(Category.categoryid)
    this.updatedImg=this.category.categoryimage
    console.log(this.category.categoryimage)
    if(this.ImgaeName!="")
    Category.categoryimage = this.ImgaeName;
    if(this.updatedImg!=null && this.ImgaeName=="")
    Category.categoryimage=this.updatedImg;
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.put("https://localhost:44391/api/Categories/UpdateCategory", Category).subscribe(
        {
          next: () => {
            this.spinner.hide();
            this.toaster.success("Category Update Successfully");
            resolve();
            debugger
          },

          error: () => {
            this.spinner.hide();
            this.toaster.error("Try again");

          }
        }
      )
    })

  }

  ImgaeName = "";

  UploadImage(imageFile: any) {
    this.http.post("https://localhost:44391/api/Courses/UploadImage", imageFile).subscribe(
      {
        next: (res: any) => {
          this.ImgaeName = res.courseimage;
        },
        error: () => { }
      }
    )
  }

  GetSelectedCategory() {
    return this.categoryID;
  }
}
