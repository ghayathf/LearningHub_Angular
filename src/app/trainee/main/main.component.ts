import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseService } from 'src/app/course.service';
import { MaterialService } from 'src/app/material.service';
import { TraineeSectionService } from 'src/app/trainee-section.service';
import { TrainerService } from 'src/app/trainer.service';
import { UserService } from 'src/app/user.service';
import { TaskService } from 'src/app/task.service';
import { AuthGuard } from 'src/app/auth.guard';
import { SectionService } from 'src/app/section.service';
import { Route, Router } from '@angular/router';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(public materialService: MaterialService, public courseService: CourseService, public dialog: MatDialog, public traineeSectionService: TraineeSectionService,
    public userService: UserService, public taskService: TaskService,public auth:AuthGuard,public sectionService:SectionService,public router:Router) { }

    user:any
    userobj:any
    trainees:any
    currTrainee:any
    ts:any
    ts2:any
    sec:any
    course:any
    tasks:any = []
    material:any
    combinedObject:any
    combinedArray:any = []
    fname:any
    lname:any
    name:any
    x:any
  async ngOnInit() {
    this.user = this.auth.gh
    await this.traineeSectionService.GetAllInfoAboutTrainee(this.user)
    this.combinedArray = this.traineeSectionService.currentTrainee
    this.x = this.combinedArray.length
    console.log(this.combinedArray);
    //this.userService.getUserById(this.user)

    this.name = this.combinedArray[0].firstname + " "+  this.combinedArray[0].lastname
    console.log(this.fname);
    const tss =await this.ts.tsid

    this.sectionService.selectedTraineeId = await this.combinedArray[0].trainee_Id
  }


  thisSection:any
  async OpenDetailedCourse(secid:any){
   await this.sectionService.GetSectionById(secid)
   this.sectionService.selectedTraineeId = this.combinedArray[0].traineeid
   console.log(this.combinedArray[0].traineeid);
   debugger
   await this.router.navigate(["Trainee/CourseDetails"])
  }
}
