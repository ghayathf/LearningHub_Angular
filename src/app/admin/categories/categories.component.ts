import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @ViewChild('CreateForm') Create: any
  @ViewChild('UpdateForm') Update: any

  UpdateCategoryForm = new FormGroup(
    {
      categoryid: new FormControl(''),
      categoryname: new FormControl('', Validators.required),

    })




  selectedItem = 0
  async openDeleteDialog(itemId: number) {
    this.selectedItem = itemId
    this.dialog.open(this.Delete)
  }
  async openUpdateDialog(categoryid: number) {
    await this.categoryService.GetCategoryById(categoryid);
    this.UpdateCategoryForm.patchValue(this.categoryService.category);
    this.dialog.open(this.Update);
  }

  async DeleteCategory() {
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
  async UpdateCategory() {
    await this.categoryService.UpdateCategory(this.UpdateCategoryForm.value);
    this.categoryService.GetAllCategories();
  }

  OpenDialog() {
    this.dialog.open(CreateCategoryComponent)
  }
}
