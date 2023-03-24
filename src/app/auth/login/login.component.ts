import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public auth: AuthService, public userService: RegisterService) {

  }
  ngOnInit() {
    this.userService.getAllUsers();
  }
  LoginformChecking: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    userpassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })
  Login() {
    this.auth.login(this.LoginformChecking.value)
  }


}
