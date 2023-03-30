import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/auth.guard';
import { SectionService } from 'src/app/section.service';
import { Route, Router } from '@angular/router';
import { TestimonialService } from 'src/app/testimonial.service';
import { UserService } from 'src/app/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.css']
})
export class TestimonialFormComponent {

constructor(public TestimonialService:TestimonialService, public dialog: MatDialog,
  public userService: UserService,public auth:AuthGuard,public router:Router) { }

  user:any
  userobj:any
  trainees:any
  currTrainee:any
  sec:any
  course:any
  tasks:any = []
  material:any
  combinedObject:any
  combinedArray:any = []
  fname:any
  lname:any
  name:any
  email:any
  x:any
async ngOnInit() {
  this.user = this.auth.gh
  await this.userService.getAllUsers()
  await this.userService.getUserById(this.user)
  this.userobj = this.userService.user
  this.currTrainee = this.trainees.find((x: { user_Id: any; })=>x.user_Id === this.user)
  const user = this.userService.users.find((x: any)=>x.userid == this.currTrainee.user_Id)
  this.userService.getUserById(this.user)
  this.fname = this.userService.user.firstname
  this.lname = this.userService.user.lastname
  this.email = this.userService.user.email
}

TestimonialFrom: FormGroup = new FormGroup(
  {
    testimonialmessage: new FormControl('', Validators.required),
    testimonialstatus: new FormControl(''),
    user_Id: new FormControl('')
  })

 async  CreateNewTestimonial() {
    await this.TestimonialFrom.controls['user_Id'].setValue(this.user);
    this.TestimonialService.CreateTestimonial(this.TestimonialFrom.value);
  }

}
