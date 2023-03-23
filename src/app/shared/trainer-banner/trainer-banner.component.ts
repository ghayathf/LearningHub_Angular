import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/auth.guard';
import { RegisterService } from 'src/app/register.service';
import { TrainerService } from 'src/app/trainer.service';

@Component({
  selector: 'app-trainer-banner',
  templateUrl: './trainer-banner.component.html',
  styleUrls: ['./trainer-banner.component.css']
})
export class TrainerBannerComponent {
/**
 *
 */
constructor(public auth:AuthGuard,public regService:RegisterService,public trainerService:TrainerService) {
}
currentUserId:any
currentUser:any
trainer:any
async ngOnInit(){
this.currentUserId = this.auth.gh
await this.regService.GetUserById(this.currentUserId)
this.currentUser = this.regService.User
console.log(this.currentUser.firstname);
await this.trainerService.GetAllTrainers()
this.trainer = this.trainerService.trainers.filter((x: { user_Id: any; })=>x.user_Id = this.currentUserId)

}

}