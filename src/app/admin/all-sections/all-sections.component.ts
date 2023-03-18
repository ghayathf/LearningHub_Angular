import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SectionService } from 'src/app/section.service';
import { MatDatepicker, MatDatepickerActions } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerFilterType } from '@mat-datetimepicker/core';
import { DatetimeAdapter } from '@mat-datetimepicker/core';

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
constructor(public sectionService: SectionService, private router: Router, public dialog: MatDialog,public spinner:NgxSpinnerService,private formBuilder: FormBuilder){}
ngOnInit() {
  this.sectionService.GetAllSections()
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


async CreateSections() {
  
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
async UpdateSectionForm() {
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
