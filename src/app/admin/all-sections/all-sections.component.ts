import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SectionService } from 'src/app/section.service';
@Component({
  selector: 'app-all-sections',
  templateUrl: './all-sections.component.html',
  styleUrls: ['./all-sections.component.css']
})
export class AllSectionsComponent {
constructor(public sectionService: SectionService, private router: Router, public spinner: NgxSpinnerService){}
ngOnInit() {
  this.sectionService.GetAllSections()
}



}
