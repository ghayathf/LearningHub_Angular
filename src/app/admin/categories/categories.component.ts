import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @ViewChild('DeleteForm') Delete: any
  selectedItem = 0
  async openDeleteDialog(itemId:number){
    this.selectedItem = itemId
    this.dialog.open(this.Delete)
  }
  async DeleteCategory(){
    await this.categoryService.DeleteCategory(this.selectedItem)
    this.categoryService.GetAllCategories()
  }
  constructor(public categoryService: CategoryService, private router: Router, private dialog: MatDialog) { }
  ngOnInit() {
    this.categoryService.GetAllCategories();
  }

  GetCategoryById(categoryid: number) {
    this.categoryService.GetCategoryById(categoryid);
    this.router.navigate(["Admin/CategoryDetails"]);
  }
  OpenDialog() {
    this.dialog.open(CreateCategoryComponent)
  }
}
