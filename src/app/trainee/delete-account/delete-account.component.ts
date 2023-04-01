import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { RegisterService } from 'src/app/register.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  constructor(public userService:UserService, private router: Router, public spinner: NgxSpinnerService,public auth:AuthGuard,public traineeService:RegisterService, public authService: AuthService) {}
  CurrentTrainee:any
  async ngOnInit() {
    await(this.auth.gh);
    // await(this.userService.getUserById(this.auth.gh));
    await(this.traineeService.GetAllTrainee())
    await(this.CurrentTrainee=this.traineeService.Trainee.find((x: { user_Id: any; })=>x.user_Id==this.auth.gh))
    console.log(this.CurrentTrainee);
    
  }
  async logout() {
    debugger
  await this.traineeService.DeleteTrainee(this.CurrentTrainee.traineeid);
  await this.userService.DeleteUser(this.auth.gh);
  await this.authService.logout()
  }
}
