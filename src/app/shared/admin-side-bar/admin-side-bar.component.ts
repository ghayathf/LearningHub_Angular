import { Component } from '@angular/core';
import { ContactusService } from 'src/app/contactus.service';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent {
  constructor(public messageService: ContactusService) { }
  c?: number;
  ngOnInit() {
    this.c = this.messageService.counter;
  }


}
