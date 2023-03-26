import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterService } from 'src/app/register.service';


/* import * as EmailJS from 'emailjs-com';
 */



@Component({
  selector: 'app-trainee-requests',
  templateUrl: './trainee-requests.component.html',
  styleUrls: ['./trainee-requests.component.css']
})
export class TraineeRequestsComponent {
  @ViewChild('DeleteForm') Delete: any
  constructor(public TraineeService: RegisterService, private dialog: MatDialog, public spinner: NgxSpinnerService) { }

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
  async ChangeStatus(requestt: any) {

/*     this.sendEmail(requestt.user_Id);
 */    await this.TraineeService.UpdateRequest(requestt);

    await this.TraineeService.GetAllTraineeUser();

    window.location.reload();
  }


  /* async sendEmail(id: number) {
    await this.TraineeService.GetUserById(id);
    const emailParams = {

      to_email: this.TraineeService.User.email,
      to_name: this.TraineeService.User.firstname
    };
    console.log(emailParams.to_email);
    console.log(emailParams.to_name);
    debugger

    EmailJS.send('service_6xav48r', 'template_ge682oo', emailParams, 'dvFAvtYsKpeW3IhUnXlTh').then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (error) => { console.log('FAILED...', error); });
  } */




}
