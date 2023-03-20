import { Component, ViewChild } from '@angular/core';
import { TestimonialService } from 'src/app/testimonial.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent {
  @ViewChild('DeleteForm') Delete: any

  constructor(public TestimonalService: TestimonialService, private dialog: MatDialog) { }
  ngOnInit() {
    this.TestimonalService.GetAllTestimonilas();
  }
  selectedItem = 0;
  openDeleteDialog(messageId: number) {
    this.selectedItem = messageId
    this.dialog.open(this.Delete)
  }
  async DeleteTestimonial() {
    await this.TestimonalService.DeleteMessage(this.selectedItem);
    this.TestimonalService.GetAllTestimonilas();
  }
  ChangeStatus(message: any) {
    this.TestimonalService.UpdateRequest(message);
    this.TestimonalService.GetAllTestimonilas();
    window.location.reload();
  }
}
