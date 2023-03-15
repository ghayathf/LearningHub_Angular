import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  constructor(public categoryService: CategoryService) { }
  CreateForm = new FormGroup(
    {
      categoryname: new FormControl('', Validators.required)
    }

  )
  async createCategory() {
    await this.categoryService.CreateCategory(this.CreateForm.value);
    this.categoryService.GetAllCategories();

  }
}
