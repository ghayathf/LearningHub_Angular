import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { TestimonialService } from 'src/app/testimonial.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  siteKey: any;
  public aFormGroup!: FormGroup;
  constructor(public auth: AuthService, public testimonialService: TestimonialService, private formBuilder: FormBuilder) {

  }



  async ngOnInit() {

    // this.aFormGroup = this.formBuilder.group({
    //   recaptcha: ['', Validators.required]
    // });
    this.siteKey = "6LcrbjIlAAAAAG5AqbaPW-a0r6sF4vQ_gUegXXwj";
    await this.testimonialService.GetAllAcceptedTestimonilas();
  }
  LoginformChecking: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    userpassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
    recaptcha: new FormControl('', [Validators.required])
  })
  Login() {
    this.auth.login(this.LoginformChecking.value)
  }


}
