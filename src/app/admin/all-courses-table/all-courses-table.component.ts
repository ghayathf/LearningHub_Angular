import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseService } from 'src/app/course.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'; 
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-all-courses-table',
  templateUrl: './all-courses-table.component.html',
  styleUrls: ['./all-courses-table.component.css']
})
export class AllCoursesTableComponent {

  @ViewChild('DeleteForm') Delete: any
  @ViewChild('UpdateForm') Update: any
  @ViewChild('DetailsForm') Details:any
  @ViewChild('CreateForm') Create:any
  @ViewChild('Search') Search: any
  @ViewChild('Categories') Categories:any
  constructor(public courseService: CourseService,public categoryService:CategoryService, private router: Router, public spinner: NgxSpinnerService, private dialog: MatDialog) {
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
      courselevel: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      category_Id: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
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
  async openUpdateDialog(courseid: number) {
    await this.courseService.GetCourseById(courseid);
    await this.UpdateCourseForm.patchValue(this.courseService.course);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';

    this.dialog.open(this.Update, dialogConfig);
  }
  async UpdateCourse() {
    await this.courseService.UpdateCourse(this.UpdateCourseForm.value);
    this.courseService.GetAllCourses();
  }
  async openDetailsDialog(courseid: number) {
    await this.courseService.GetCourseById(courseid);
    this.dialog.open(this.Details);
  }

  OpenCreateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(this.Create, dialogConfig)
  }
  selectedCategory:any
  async CreateCourse() {
    this.CreateCourseForm.patchValue({
      category_Id: this.selectedCategory
    });
    await this.courseService.CreateCourse(this.CreateCourseForm.value);
    this.courseService.GetAllCourses();
  }
  CourseName?:string
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
  print(category:string){
 console.log(category)
  }

  UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille 
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.courseService.UploadImage(formdata);
    }
  }
}
