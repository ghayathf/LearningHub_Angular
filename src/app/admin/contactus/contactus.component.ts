import { Component } from '@angular/core';
import { ContactusService } from 'src/app/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  constructor(public messageService: ContactusService) { }

  ngOnInit() {
    this.messageService.GetAllMessage();
  }
}
