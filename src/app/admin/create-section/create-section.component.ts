import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SectionService } from 'src/app/section.service';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatDatepicker, MatDatepickerActions } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/material.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})

export class CreateSectionComponent {
  constructor(public sectionService: SectionService) { }
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
