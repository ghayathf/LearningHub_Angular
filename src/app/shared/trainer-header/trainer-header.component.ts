import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-trainer-header',
  templateUrl: './trainer-header.component.html',
  styleUrls: ['./trainer-header.component.css']
})
export class TrainerHeaderComponent {
  constructor(public ngbDropdown:NgbDropdownModule,public auth:AuthGuard,public userService:RegisterService,public authService:AuthService) {

  }

  firstnamee:any
  ngOnInit(){
    this.auth.gh
    this.userService.GetUserById(this.auth.gh)
  }
  logout(){
  this.authService.logout()
  }
}
