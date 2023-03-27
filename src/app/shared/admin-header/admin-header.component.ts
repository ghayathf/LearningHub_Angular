import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { PagesService } from 'src/app/pages.service';
import { RegisterService } from 'src/app/register.service';
import { TrainerService } from 'src/app/trainer.service';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(public Data: PagesService, public ngbDropdown: NgbDropdownModule, public auth: AuthGuard, public userService: RegisterService, public authService: AuthService) {

  }

  firstnamee: any
  ngOnInit() {
    this.auth.gh
    this.userService.GetUserById(this.auth.gh)
    this.Data.GetAllHome();
  }
  logout() {
    this.authService.logout()
  }
}
