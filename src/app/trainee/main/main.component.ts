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
    sec:any
    course:any
    tasks:any = []
    material:any
    combinedObject:any
    combinedArray:any = []
  async ngOnInit() {
    this.user = this.auth.gh
    await this.traineeSectionService.GetAllTrainees()
    this.trainees = this.traineeSectionService.allTrainees
    await this.traineeSectionService.GetAllTraineeSection()
    await this.userService.getUserById(this.user)
    await this.sectionService.GetAllSections()
    await this.courseService.GetAllCourses()
    await this.taskService.GetAllTasks()
    await this.materialService.GetAllMaterial()
    this.userobj = this.userService.user
    this.currTrainee = this.trainees.find((x: { user_Id: any; })=>x.user_Id === this.user)
    this.ts = this.traineeSectionService.TraineeSections.find((x: { trainee_Id: any; })=>x.trainee_Id == this.currTrainee.traineeid)
    this.sec = this.sectionService.sections.find((x: { sectionid: any; })=>x.sectionid == this.ts.section_id)
    this.course = this.courseService.courses.find((x: { courseid: any; })=>x.courseid == this.sec.course_Id)
    this.tasks = this.taskService.tasks.filter((x: { sectionidd: any; })=>x.sectionidd == this.sec.sectionid)
    this.material = this.materialService.materials.filter((x: { section_Id: any; })=>x.section_Id == this.sec.sectionid)
    this.combinedArray = this.traineeSectionService.TraineeSections.filter((x: { trainee_Id: number; }) => x.trainee_Id === this.currTrainee.traineeid).map((ts: any) => {
      const section = this.sectionService.sections.find((sec: any) => sec.sectionid == ts.section_id);
      const course = this.courseService.courses.find((x: any)=>x.courseid == section.course_Id)
      return { ...ts, ...section, ...course };
    });


    /* this.combinedObject = {
      userobj: this.userobj,
      currTrainee: this.currTrainee,
      ts: this.ts,
      sec: this.sec,
      course: this.course,
      tasks: this.tasks,
      material: this.material
    } */
    console.log(this.combinedArray);

  }
  thisSection:any
  async OpenDetailedCourse(secid:any){
   await this.sectionService.GetSectionById(secid)
   await this.router.navigate(["Trainee/CourseDetails"])
  }
}
