import { Component } from '@angular/core';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-trainee-requests',
  templateUrl: './trainee-requests.component.html',
  styleUrls: ['./trainee-requests.component.css']
})
export class TraineeRequestsComponent {
  constructor(public TraineeService: RegisterService) { }

  ngOnInit() {
    this.TraineeService.GetAllTraineeUser();
  }
}
