import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  UpdateProfileForm = new FormGroup(
    {
      userid : new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
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
      imagename:new FormControl('')
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
    await this.UpdateProfileForm.patchValue(this.userService.user);

  }
  async UpdateInformation(){
    this.loggedUser = this.auth.gh
    await this.UpdateProfileForm.controls['userid'].setValue(this.loggedUser)
    await this.UpdateProfileForm.controls['roleId'].setValue(this.role)

    await this.userService.UpdateUser(this.UpdateProfileForm.value)
  }

  UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.userService.UploadImage(formdata);
    }
  }


}
