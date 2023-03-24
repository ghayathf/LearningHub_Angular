import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseService } from 'src/app/course.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/category.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Object } from 'core-js';


import { EnumValuesPipe } from '../../enum-values.pipe';


@Component({
  selector: 'app-all-courses-table',
  templateUrl: './all-courses-table.component.html',
  styleUrls: ['./all-courses-table.component.css']
})
export class AllCoursesTableComponent {

  @ViewChild('DeleteForm') Delete: any
  @ViewChild('UpdateForm') Update: any
  @ViewChild('DetailsForm') Details: any
  @ViewChild('CreateForm') Create: any
  @ViewChild('Search') Search: any
  @ViewChild('Categories') Categories: any
  constructor(public courseService: CourseService, public categoryService: CategoryService, private router: Router, public spinner: NgxSpinnerService, private dialog: MatDialog) {
  }

  CreateCourseForm = new FormGroup(
    {
      coursename: new FormControl('', Validators.required),
      coursedescription: new FormControl('', Validators.required),
      courselevel: new FormControl('', Validators.required),
      category_Id: new FormControl('', Validators.required)
    }
  )

  UpdateCourseForm = new FormGroup(
    {
      courseid: new FormControl(''),
      coursename: new FormControl('', Validators.required),
      coursedescription: new FormControl('', Validators.required),
      courseimage: new FormControl('', Validators.required),
      courselevel: new FormControl(''),
      category_Id: new FormControl(''),
    })

  ngOnInit() {
    this.courseService.GetAllCourses()
    this.categoryService.GetAllCategories()
    
  }
  GetCourseById(courseid: number) {
    this.courseService.GetCourseById(courseid)
    this.router.navigate(["Admin/CourseDetails"])
  }
  selectedItem = 0
  async openDeleteDialog(itemId: number) {
    this.selectedItem = itemId
    this.dialog.open(this.Delete)
  }
  async DeleteCourse() {
    await this.courseService.deleteCourse(this.selectedItem)
    this.courseService.GetAllCourses()
  }
course:any
selectedUpdatedCategory:any
selectedUpdatedLevel:any
currentImg:any
courseLevel?:any
courseCategory?:any
category?:any
categoryName?:any
  async openUpdateDialog(courseid: number) {
    await this.courseService.GetCourseById(courseid);
    await this.UpdateCourseForm.patchValue(this.courseService.course);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
    this.course=this.courseService.course
    this.selectedUpdatedCategory=this.course.category_Id
    this.selectedUpdatedLevel=this.course.courselevel
    if(this.course.courselevel==1)
    this.courseLevel=Levels.Beginner
    else if(this.course.courselevel==2)
    this.courseLevel=Levels[2]
    else
    this.courseLevel=Levels[3]
    this.category=this.categoryService.GetCategoryById(this.course.category_Id)
    this.CourseName=this.category.categoryname
    this.currentImg=this.course.courseimage
    this.dialog.open(this.Update, dialogConfig);
  }
  
  async UpdateCourse() {
    if(this.selectedUpdatedCategory!=null)
    this.UpdateCourseForm.patchValue({
      category_Id: this.selectedUpdatedCategory
    });
    else{
      this.selectedUpdatedCategory=this.course.category_Id
    this.UpdateCourseForm.patchValue({
      category_Id: this.selectedUpdatedCategory
    });}

    if(this.selectedUpdatedLevel!=null)
    this.UpdateCourseForm.patchValue({
      courselevel: this.selectedUpdatedLevel
    });
    else{
      this.selectedUpdatedLevel=this.course.courselevel
      this.UpdateCourseForm.patchValue({
        courselevel: this.selectedUpdatedLevel
      });
    }
    if(this.selectedImg!=null)
    this.UpdateCourseForm.patchValue({
      courseimage: this.selectedImg
    });
    else
    { this.selectedImg=this.currentImg
      this.UpdateCourseForm.patchValue({
        courseimage: this.selectedImg
      });
    }
    await this.courseService.UpdateCourse(this.UpdateCourseForm.value);
    this.courseService.GetAllCourses();
    window.location.reload()
  }
  async openDetailsDialog(courseid: number) {
    await this.courseService.GetCourseById(courseid);
    this.dialog.open(this.Details);
  }
  OpenCreateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.Create, dialogConfig)
  }
  selectedCategory: any
  selectedLevel: any
  async CreateCourse() {
    this.CreateCourseForm.patchValue({
      category_Id: this.selectedCategory
    });
    this.CreateCourseForm.patchValue({
      courselevel: this.selectedLevel
    });
    await this.courseService.CreateCourse(this.CreateCourseForm.value);
    this.courseService.GetAllCourses();
  }
  CourseName?: string
  searchCourses() {
    this.spinner.show();
    this.courseService.searchCourses(this.CourseName).subscribe(
      {
        next: (res) => {
          this.spinner.hide();
          this.courseService.searchedCourses = res;
          this.dialog.open(this.Search);
        },
        error: () => {
          this.spinner.hide();
          console.error('An error occurred while searching for courses');
        }
      }
    );
  }
  print(category: string) {
    console.log(category)
  }
 selectedImg:any
  UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.courseService.UploadImage(formdata);
    }
    this.selectedImg=input
  }
  Levels = Levels;
  async getCategoryName(category_Id: any) {
    await this.categoryService.GetCategoryById(category_Id);
    const category = this.categoryService.categories;
    return category ? category.categoryname : '';
  }
}
enum Levels {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}