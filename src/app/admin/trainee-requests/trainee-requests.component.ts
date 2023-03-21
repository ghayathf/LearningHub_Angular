import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-trainee-requests',
  templateUrl: './trainee-requests.component.html',
  styleUrls: ['./trainee-requests.component.css']
})
export class TraineeRequestsComponent {
  @ViewChild('DeleteForm') Delete: any
  constructor(public TraineeService: RegisterService, private dialog: MatDialog,public spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.TraineeService.GetAllTraineeUser();
  }
  selectedItem = 0
  openDeleteDialog(id: number) {
    this.selectedItem = id;
    this.dialog.open(this.Delete);
  }
  async DeleteRequest() {
    await this.TraineeService.DeleteRequest(this.selectedItem);
    this.TraineeService.GetAllTraineeUser();
  }
  SelectdUserId = 0;
  ChangeStatus(requestt: any) {

    this.TraineeService.UpdateRequest(requestt);
    this.TraineeService.GetAllTraineeUser();
    window.location.reload();

  }
}
