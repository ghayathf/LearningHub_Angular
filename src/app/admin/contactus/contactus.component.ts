import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactusService } from 'src/app/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  @ViewChild('DeleteForm') Delete: any
  constructor(public messageService: ContactusService, private dialog: MatDialog) { }

  ngOnInit() {
    this.messageService.GetAllMessage();
  }
  selectedItem = 0
  async openDeleteDialog(messageId: number) {


    this.selectedItem = messageId
    this.dialog.open(this.Delete)

  }
  c: number = this.messageService.counter;

  async DeleteMessage() {
    await this.messageService.DeleteMessage(this.selectedItem);
    this.messageService.GetAllMessage();
  }
}
