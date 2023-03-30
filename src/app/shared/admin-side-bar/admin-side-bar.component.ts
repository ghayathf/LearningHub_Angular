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
  cc:any
  async ngOnInit() {
    await( this.c = this.messageService.counter)
    await this.Data.GetAllHome();
    await(this.cc = this.Data.homes[0].logo) 
  }


}
