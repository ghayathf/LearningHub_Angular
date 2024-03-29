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
  constructor(public TraineeService: RegisterService, private dialog: MatDialog, public spinner: NgxSpinnerService) { }
  pending:any
  accepted:any
  
  async ngOnInit() {
   await this.TraineeService.GetAllTraineeUser();
    this.pending=this.TraineeService.filterData.length
    await this.TraineeService.GetAllAcceptedTrainee();
    this.accepted=this.TraineeService.AcceptedTrainee.length

  }
  selectedItem = 0
  openDeleteDialog(id: number) {
    this.selectedItem = id;
    this.dialog.open(this.Delete);
  }
  UserInfo:any
  async DeleteRequest() {
    await this .TraineeService.GetUserById(this.selectedItem);
    await this.TraineeService.DeleteRequest(this.selectedItem);
   
    this.UserInfo = this.TraineeService.User;
    await this.sendRejectEmail(this.UserInfo.email,this.UserInfo.firstname);
    this.TraineeService.GetAllTraineeUser();
  }
  UID:any
  async ChangeStatus(requestt: any) {
  await this.TraineeService.UpdateRequest(requestt);
  await this.TraineeService.GetAllTraineeUser();

  await this.TraineeService.UpdateRequest(requestt);
  this.UID=requestt.user_Id
  await this.TraineeService.GetUserById(this.UID);
  await this.sendEmail(this.TraineeService.User.email,this.TraineeService.User.firstname);
  await this.TraineeService.GetAllTraineeUser();
  window.location.reload();
  }
 async sendEmail(ToEmail:string , ToName:string) {
  const emailParams = {
    to_email: ToEmail,
    to_name:ToName
    };
    await this.TraineeService.AcceptEmail(emailParams);
  }
  async sendRejectEmail(ToEmail:string , ToName:string) {
    const emailParams = {
      to_email: ToEmail,
      to_name:ToName
      };
      await this.TraineeService.RejectEmail(emailParams);
    }
}
