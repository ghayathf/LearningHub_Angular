import { Component } from '@angular/core';
import { TrainerService } from 'src/app/trainer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
/**
 *
 */
constructor(public trainerService:TrainerService) {

}
ngOnInit(){
this.trainerService.GetAllTrainers()
}
}
