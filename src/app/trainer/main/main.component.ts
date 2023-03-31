import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { AuthGuard } from 'src/app/auth.guard';
import { CourseService } from 'src/app/course.service';
import { SectionService } from 'src/app/section.service';
import { TraineeSectionService } from 'src/app/trainee-section.service';
import { TrainerService } from 'src/app/trainer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  /**
   *
   */
  constructor(public trainerService: TrainerService, public sectionService: SectionService, public auth: AuthGuard, public courseService: CourseService, private router: Router,public tsService:TraineeSectionService, public spinner: NgxSpinnerService) {

  }
  userId: any
  trainers: any
  trainerId: any
  sections: any
  combinedArray: any = []
  newArray: any = []
  sectionsLength:any
  allStds:any
  foundArray:any
  trainsLen:any
  trainerPos:any
  async ngOnInit() {
    this.userId = this.auth.gh
    await this.trainerService.GetTrainerByUser(this.userId)
    this.combinedArray = this.trainerService.myTrainer
    this.trainerId = this.combinedArray[0].trainerid
    this.trainerPos = this.combinedArray[0].trainerposition
    this.trainsLen = this.combinedArray[0].qualification
    await this.sectionService.GetAllSections()
    this.sections = this.sectionService.sections.filter((x: { trainer_Id: any; }) => x.trainer_Id == this.trainerId)

    this.sectionsLength = this.sections.length
  }

  getDaysDifference(startdate: string, enddate: string): number {
    const start = new Date(startdate);
    const end = new Date(enddate);
    const diffInMs = end.getTime() - start.getTime();
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return days;
  }

  courseName: any
  courseImage: any
  obj: any
  async getCourse(id: number) {
    await this.courseService.GetCourseById(id)
    this.obj = this.courseService.courses
    return this.obj.coursename

  }
  async goingDialog(secId: number, courseid: number) {
    this.courseService.selectedSectionId = secId
    this.courseService.selectedCourseId = courseid
    console.log(courseid);

    await this.router.navigate(['/Trainer/CourseDetailed']);
  }

}
