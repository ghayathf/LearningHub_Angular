import { Component } from '@angular/core';
import { ContactusService } from 'src/app/contactus.service';
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent {
  constructor(public messageService: ContactusService, public Data: PagesService) { }
  c?: number;
  ngOnInit() {
    this.c = this.messageService.counter;
    this.Data.GetAllHome();
  }


}
