import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { TrainerService } from 'src/app/trainer.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  constructor(public userService:UserService, private router: Router, public spinner: NgxSpinnerService,public auth:AuthGuard,public trainerService:TrainerService, public authService: AuthService) {}
  CurrentTrainer:any
  async ngOnInit() {
    await(this.auth.gh);
    // await(this.userService.getUserById(this.auth.gh));
    await(this.trainerService.GetAllTrainers())
    await(this.CurrentTrainer=this.trainerService.trainers.find((x: { user_Id: any; })=>x.user_Id==this.auth.gh))
  }
  async logout() {
  await this.trainerService.DeleteTrainer(this.CurrentTrainer.trainerid);
  await this.userService.DeleteUser(this.auth.gh);
  await this.authService.logout()
  }
}
