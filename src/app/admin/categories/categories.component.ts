import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { CourseService } from 'src/app/course.service';
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

  CreateCategoryForm = new FormGroup(
    {
      categoryname: new FormControl('', Validators.required)
    }
  )
  constructor(public categoryService: CategoryService, private router: Router, private dialog: MatDialog, public courseService: CourseService, public spinner: NgxSpinnerService) { }
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
categoryImage:any
 categoryImg?:string
  async openUpdateDialog(categoryid: number) {
    await this.categoryService.GetCategoryById(categoryid);
    this.categoryImage = this.categoryService.category.categoryimage
    await this.UpdateCategoryForm.patchValue(this.categoryService.category);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
    this.categoryImg=this.categoryService.category.categoryimage
    this.dialog.open(this.Update, dialogConfig);
  }
  async UpdateCategory() {
    await this.categoryService.UpdateCategory(this.UpdateCategoryForm.value);
    this.categoryService.GetAllCategories();
    window.location.reload()
  }

  OpenCreateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '850px';
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(this.Create, dialogConfig)
  }
  async createCategory() {
    await this.categoryService.CreateCategory(this.CreateCategoryForm.value);
    this.categoryService.GetAllCategories();
  }
currentImage:any
  UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.categoryService.UploadImage(formdata);
    }
  }

}
