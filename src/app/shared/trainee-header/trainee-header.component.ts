import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { PagesService } from 'src/app/pages.service';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-trainee-header',
  templateUrl: './trainee-header.component.html',
  styleUrls: ['./trainee-header.component.css']
})
export class TraineeHeaderComponent {
  constructor(public Data: PagesService, public ngbDropdown: NgbDropdownModule, public auth: AuthGuard, public userService: RegisterService, public authService: AuthService) {

  }

  firstnamee: any
  ngOnInit() {
    this.auth.gh
    this.Data.GetAllHome();
    this.userService.GetUserById(this.auth.gh)
  }
  logout() {
    this.authService.logout()
  }
}
