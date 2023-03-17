import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SectionService } from 'src/app/section.service';
import { MatDatepicker, MatDatepickerActions } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-sections',
  templateUrl: './all-sections.component.html',
  styleUrls: ['./all-sections.component.css']
})
export class AllSectionsComponent {
  @ViewChild('CreateForm') Create: any
  @ViewChild('UpdateForm') Update: any
  @ViewChild('DeleteForm') Delete: any
  @ViewChild('DetailsForm') Details: any
constructor(public sectionService: SectionService, private router: Router, public dialog: MatDialog,public spinner:NgxSpinnerService){}
ngOnInit() {
  this.sectionService.GetAllSections()
}
OpenDialog() {
  
  this.dialog.open(this.Create)
}
CreateForm = new FormGroup(
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
async CreateSection() {
  
  await this.sectionService.CreateSection(this.CreateForm.value);
  this.sectionService.GetAllSections();

}

}
