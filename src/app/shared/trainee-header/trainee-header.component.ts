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
  logo:any
  async ngOnInit() {
    await(this.auth.gh)
    await(this.Data.GetAllHome())
    await(this.userService.GetUserById(this.auth.gh))
    await(this.logo=this.Data.homes[0].logo)
  }
  logout() {
    this.authService.logout()
  }
}
