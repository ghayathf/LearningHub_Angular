import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { AuthGuard } from 'src/app/auth.guard';
import { CourseService } from 'src/app/course.service';
import { SectionService } from 'src/app/section.service';
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
  constructor(public trainerService: TrainerService, public sectionService: SectionService, public auth: AuthGuard, public courseService: CourseService, private router: Router, public spinner: NgxSpinnerService) {

  }
  userId: any
  trainers: any
  trainerId: any
  sections: any
  combinedArray: any = []
  newArray: any = []
  sectionsLength:any
  async ngOnInit() {
    this.userId = this.auth.gh
    await this.trainerService.GetAllTrainers()
    this.trainerId = this.trainerService.trainers.find((x: { user_Id: any; }) => x.user_Id == this.userId).trainerid
    await this.sectionService.GetAllSections()
    this.sections = this.sectionService.sections.filter((x: { trainer_Id: any; }) => x.trainer_Id == this.trainerId)
    await this.courseService.GetAllCourses()
    this.combinedArray = this.sectionService.sections.filter((x: { trainer_Id: any; }) => x.trainer_Id == this.trainerId).map((s: any) => {
      const coursee = this.courseService.courses.find((coursee: any) => coursee.courseid === s.course_Id);

      return { ...s, ...coursee };
    });
    console.log(this.combinedArray);

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
