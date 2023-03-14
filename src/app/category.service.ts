import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  categories:any=[]
  GetAllCategories(){
    this.http.get("https://localhost:44391/api/Categories/GetAllCategories").subscribe(
      (res)=>{this.categories=res},
      (err)=>{console.log(err);
      }
    )
  }
  category:any
  GetCategoryById(categoryid:number){
    this.http.get("https://localhost:44391/api/Categories/GetCategoryById/"+categoryid).subscribe(
      {
        next:(res)=>{this.category=res},
        error:(err)=>{console.log(err);
        }
      }
    )
  }
  GetSelectedCategory()
  {
    return this.category;
  }
}
