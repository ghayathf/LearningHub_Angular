import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-trainee-requests',
  templateUrl: './trainee-requests.component.html',
  styleUrls: ['./trainee-requests.component.css']
})
export class TraineeRequestsComponent {
  @ViewChild('DeleteForm') Delete: any
  constructor(public TraineeService: RegisterService, private dialog: MatDialog) { }

  ngOnInit() {
    this.TraineeService.GetAllTraineeUser();
  }
  selectedItem = 0
  openDeleteDialog(id: number) {
    this.selectedItem = id;
    this.dialog.open(this.Delete);
  }
  // async DeleteRequest() {
  //   await this.TraineeService.DeleteRequest(this.selectedItem);
  //   this.TraineeService.GetAllTraineeUser();
  // }

  // ChangeStatus(request: any) {
  //   this.TraineeService.UpdateRequest(request);
  //   this.TraineeService.GetAllTraineeUser();
  // }
}
