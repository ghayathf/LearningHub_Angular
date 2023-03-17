import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SectionService } from 'src/app/section.service';

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
