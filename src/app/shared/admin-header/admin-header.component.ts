import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'; 
import { AuthGuard } from 'src/app/auth.guard';
import { RegisterService } from 'src/app/register.service';
import { TrainerService } from 'src/app/trainer.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

constructor(public ngbDropdown:NgbDropdownModule,public auth:AuthGuard,public userService:RegisterService) {

}
firstnamee:any
ngOnInit(){
  this.auth.gh
  this.userService.GetUserById(this.auth.gh)
}
}
