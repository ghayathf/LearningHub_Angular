import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SectionService } from 'src/app/section.service';
import { MatDatepicker, MatDatepickerActions } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { TrainerService } from 'src/app/trainer.service';
import { CourseService } from 'src/app/course.service';
import { UserService } from 'src/app/user.service';



@Component({
  selector: 'app-all-sections',
  templateUrl: './all-sections.component.html',
  styleUrls: ['./all-sections.component.css']
})
export class AllSectionsComponent {
  @ViewChild('CreateSection') Create: any
  @ViewChild('UpdateSection') Update: any
  @ViewChild('DeleteForm') Delete: any
  @ViewChild('DetailsForm') Details: any
constructor(public sectionService: SectionService, private router: Router, public dialog: MatDialog,public spinner:NgxSpinnerService,private formBuilder: FormBuilder,public trainerService:TrainerService,public courseService:CourseService,public userService:UserService){}

users:any=[]
trainers:any=[]
combinedArray:any=[]
UserTrainer? :any
ngOnInit() {
  this.sectionService.GetAllSections()
  this.userService.getAllUsers()
  this.trainerService.GetAllTrainers()
  this.courseService.GetAllCourses()
  this. trainers= this.trainerService.trainers
  this.users=this.userService.users
  this. combinedArray = this.users.filter((x: { roleId: number; }) => x.roleId == 3).concat(this.trainers.filter((trainer :any)=> {
    return this.users.find((user:any) => user.userid== trainer.user_Id);
  
  }));
  console.log(this.combinedArray)
  
}

OpenDialog() {
  const dialogConfig = new MatDialogConfig();
dialogConfig.maxWidth = '500px';
dialogConfig.maxHeight = '90vh';
  this.dialog.open(this.Create,dialogConfig)
}
CreateForm =new FormGroup(
  {
    starttime : new FormControl('',Validators.required),
    endtime : new FormControl('',Validators.required),
    startdate : new FormControl('',Validators.required),
    enddate : new FormControl('',Validators.required),
    meetingurl : new FormControl('',Validators.required),
    sectioncapacity: new FormControl('',Validators.required),
    course_Id:new FormControl('',Validators.required),
    trainer_Id:new FormControl('',Validators.required)
  }
)
UpdateForm =new FormGroup(
  {
    sectionid:new FormControl('',Validators.required),
    starttime : new FormControl('',Validators.required),
    endtime : new FormControl('',Validators.required),
    startdate : new FormControl('',Validators.required),
    enddate : new FormControl('',Validators.required),
    meetingurl : new FormControl('',Validators.required),
    sectioncapacity: new FormControl('',Validators.required),
    course_Id:new FormControl('',Validators.required),
    trainer_Id:new FormControl('',Validators.required)
  }
)

selectedCourse:any
selectedTrainer:any
async CreateSections() {
  this.CreateForm.patchValue({
    course_Id: this.selectedCourse
  });
  this.CreateForm.patchValue({
    trainer_Id: this.selectedTrainer
  });
  await this.sectionService.CreateSection(this.CreateForm.value);
  this.sectionService.GetAllSections();

}
selectedItem :number= 0
async openDeleteDialog(section_Id:number){
  this.selectedItem = section_Id
  this.dialog.open(this.Delete)
}
async DeleteSection(){
  await this.sectionService.DeleteSection(this.selectedItem)
  this.sectionService.GetAllSections()
}
async openUpdateDialog(sectionid: number) {
  await this.sectionService.GetSectionById(sectionid);
  await this.UpdateForm.patchValue(this.sectionService.section);

  const dialogConfig = new MatDialogConfig();
  dialogConfig.maxWidth = '500px';
  dialogConfig.maxHeight = '90vh';

  this.dialog.open(this.Update, dialogConfig);
}
selectedUpdatedCourse:any
selectedUpdatedTrainer:any
async UpdateSectionForm() {
  this.UpdateForm.patchValue({
    course_Id: this.selectedUpdatedCourse
  });
  this.UpdateForm.patchValue({
    trainer_Id: this.selectedUpdatedTrainer
  });
  await this.sectionService.UpdateSection(this.UpdateForm.value);
  this.sectionService.GetAllSections();
}
async openDetailsDialog(sectionid: number)
{

  await this.sectionService.GetSectionById(sectionid);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.maxWidth = '500px';
  dialogConfig.maxHeight = '90vh';
  this.dialog.open(this.Details,dialogConfig);
}
}
