import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuard } from 'src/app/auth.guard';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  CreateUserForm = new FormGroup(
    {
      userid : new FormControl('',),
      username : new FormControl('',Validators.required),
      userpassword : new FormControl('',Validators.required),
      email : new FormControl('',Validators.required),
      phonenumber : new FormControl('',Validators.required),
      firstname : new FormControl('',Validators.required),
      lastname : new FormControl('',Validators.required),
      roleId :  new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
    }
  )
  /**
   *
   */
  constructor(public userService:UserService, private router: Router, public spinner: NgxSpinnerService, private dialog: MatDialog,public auth:AuthGuard) {
  }
  loggedUser:any
  user:any
  role:any = 1
  async ngOnInit(){
    this.loggedUser = this.auth.gh
    await this.userService.getUserById(this.loggedUser)
    await this.CreateUserForm.patchValue(this.userService.user);
  }
  async UpdateInformation(){
    this.loggedUser = this.auth.gh
    await this.CreateUserForm.controls['userid'].setValue(this.loggedUser)
    await this.CreateUserForm.controls['roleId'].setValue(this.role)
    await this.userService.UpdateUser(this.CreateUserForm.value)
  }

}

