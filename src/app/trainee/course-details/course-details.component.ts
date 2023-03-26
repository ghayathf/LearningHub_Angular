import { Component } from '@angular/core';
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
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
section:any
taskss:any = []
mats:any=[]
thisCourse:any
coursename:any
courseLevel:any
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
  this.section = this.sectionService.section

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

await this.taskService.GetAllTasks()
await this.materialService.GetAllMaterial()
await this.courseService.GetAllCourses()
this.tasks = await this.taskService.tasks.filter((x: { sectionidd: any; })=>x.sectionidd == this.section.sectionid)
this.mats = await this.materialService.materials.filter((x: { section_Id: any; })=>x.section_Id == this.section.sectionid)
this.thisCourse = await this.courseService.courses.find((x: { courseid: any; })=>x.courseid == this.section.course_Id)
this.coursename = await this.thisCourse.coursename
if(this.thisCourse.courselevel==1)

 this.courseLevel=Levels[1]

 else if(this.course.courselevel==2)

 this.courseLevel=Levels[2]

 else

 this.courseLevel=Levels[3]
}

submitAttendance(){}
OpenDialog(){}
async downloadFile(t:any){
   await this.materialService.GetMaterialById(t);
  this.material = this.materialService.Material.filepath;
  const filePath = "../../../assets/HomeAssets/Materials/" + this.material;

  const response = await fetch(filePath);
  const lastDotIndex = filePath.lastIndexOf(".");
  const slicedStr = filePath.slice(lastDotIndex + 1);
  const blob = await response.blob();

  // Create a URL for the Blob using createObjectURL
  const url = URL.createObjectURL(blob);

  // Create an anchor tag and trigger the download by simulating a click
  const a = document.createElement('a');
  a.href = url;
  a.download = this.materialService.Material.materialname + '.' + slicedStr;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Release the object URL after the download is complete
  URL.revokeObjectURL(url);}
openDeleteDialog(t:any){}
openUpdateDialog(t:any){}

}
enum Levels {

   Beginner = 1,

   Intermediate = 2,

   Advanced = 3,

  }
