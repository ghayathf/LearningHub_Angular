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
    //await this.traineeSectionService.GetAllTrainees()
    //this.trainees = this.traineeSectionService.allTrainees
    /* await this.traineeSectionService.GetAllTraineeSection()
    await this.userService.getAllUsers()
    await this.userService.getUserById(this.user)
    await this.sectionService.GetAllSections()
    await this.courseService.GetAllCourses()
    this.userobj = this.userService.user
    this.currTrainee = this.trainees.find((x: { user_Id: any; })=>x.user_Id === this.user)
    this.ts = this.traineeSectionService.TraineeSections.find((x: { trainee_Id: any; })=>x.trainee_Id == this.currTrainee.traineeid)
    this.ts2 = this.traineeSectionService.TraineeSections.filter((x: { trainee_Id: any; })=>x.trainee_Id == this.currTrainee.traineeid)
    this.sec = this.sectionService.sections.find((x: { sectionid: any; })=>x.sectionid == this.ts.section_id)
    this.course = this.courseService.courses.find((x: { courseid: any; })=>x.courseid == this.sec.course_Id) */
    await this.traineeSectionService.GetAllInfoAboutTrainee(this.user)
    this.combinedArray = this.traineeSectionService.currentTrainee
    /* await this.traineeSectionService.TraineeSections.filter((x: { trainee_Id: number; }) => x.trainee_Id === this.currTrainee.traineeid).map( (ts: any) => {
      const section = this.sectionService.sections.find((sec: any) => sec.sectionid == ts.section_id);
      const course = this.courseService.courses.find((x: any)=>x.courseid == section.course_Id)
      const user = this.userService.users.find((x: any)=>x.userid == this.currTrainee.user_Id)
      return { ...ts, ...section, ...course,...user };
    }); */
    this.x = this.combinedArray.length
    console.log(this.x);
    console.log(this.combinedArray);
    //this.userService.getUserById(this.user)

    this.name = this.combinedArray[0].firstname + " "+  this.combinedArray[0].lastname
    console.log(this.fname);
    const tss =await this.ts.tsid
    await this.traineeSectionService.getAllCertificates(this.ts.tsid,this.ts.section_id);
    // await this.traineeSectionService.GetAbsentTrainees(this.ts.section_id);

    //await this.traineeSectionService.GetTSById(this.ts.tsid);
  }
   DownloadCertificate(tid:any,StartDate:any,endDate:any,coursename:any,fname:any){
    const doc = new jsPDF('l', 'mm', 'a4');
    const certificateTemplate = new Image();
    certificateTemplate.src = "../../../assets/HomeAssets/certificate.png"; // Replace with the path to your certificate design file

    certificateTemplate.onload = function() {
      doc.addImage(certificateTemplate, 'PNG', 0, 0, doc.internal.pageSize.height+90, doc.internal.pageSize.width-85);
      doc.setFontSize(47.5);
      doc.text(fname, 110, 120); // Replace the "Student Name" placeholder with the actual student name
      doc.setFontSize(23);
      doc.text(coursename, 155, 145 ); // Replace the "Course Completed" placeholder with the actual course completed
      doc.setFontSize(19.3);
      doc.text(StartDate.slice(0,10), 95, 154);
      doc.setFontSize(19.3);
      doc.text(endDate.slice(0,10), 157, 154);
      doc.save('certificate.pdf');
    }
}

  thisSection:any
  async OpenDetailedCourse(secid:any){
   await this.sectionService.GetSectionById(secid)
   await this.router.navigate(["Trainee/CourseDetails"])
  }
}
