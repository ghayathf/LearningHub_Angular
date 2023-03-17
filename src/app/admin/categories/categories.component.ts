import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { CourseService } from 'src/app/course.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';


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

constructor(public categoryService: CategoryService, private router: Router, private dialog: MatDialog,public courseService:CourseService,public spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.categoryService.GetAllCategories();
  }

  GetCategoryById(categoryid: number) {
    this.categoryService.GetCategoryById(categoryid);
    this.router.navigate(["Admin/CategoryDetails"]);
  }


  selectedItem = 0
  async openDeleteDialog(itemId: number) {
    this.selectedItem = itemId
    this.dialog.open(this.Delete)
  }
  async DeleteCategory() {
    await this.categoryService.DeleteCategory(this.selectedItem)
    this.categoryService.GetAllCategories()
  }

  async openUpdateDialog(categoryid: number) {
    await this.categoryService.GetCategoryById(categoryid);
    await this.UpdateCategoryForm.patchValue(this.categoryService.category);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';

    this.dialog.open(this.Update, dialogConfig);
  }
async UpdateCategory() {
    await this.categoryService.UpdateCategory(this.UpdateCategoryForm.value);
    this.categoryService.GetAllCategories();
  }

  OpenDialog() {

    this.dialog.open(CreateCategoryComponent)
  }
}
