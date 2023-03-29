import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, public UserService: RegisterService) { }

  onNext(): void {
    this.router.navigate(['/register2']);
  }


  UserForm: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phonenumber: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    userpassword: new FormControl('', [Validators.required, Validators.minLength(10)]),
    roleId: new FormControl(''),
    imagename:new FormControl('')
  })

  TraineeForm: FormGroup = new FormGroup(
    {
      university: new FormControl('', Validators.required),
      major: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      traineefield: new FormControl('', Validators.required),
      registerstatus: new FormControl(''),
      user_Id: new FormControl('')
    }
  )
 async CreateNewUser() {
  // const image = new Image();
  //   image.src="../../../assets/HomeAssets/451-4517876_default-profile-hd-png-download (1).png"
  //   image.onload = () => {
  //     const imageUrl = image.src;
  //     this.UserForm.controls['imagename'].setValue(imageUrl);
  //   };
   this.UserForm.controls['imagename'].setValue('451-4517876_default-profile-hd-png-download (1).png');

    this.UserService.CreateUser(this.UserForm.value);
  }

  CreateNewTrainee() {
    this.TraineeForm.controls['user_Id'].setValue(this.UserService.lastid);
    this.UserService.CreateTrainne(this.TraineeForm.value);
    this.router.navigate(['/Auth/login'])
  }





}
