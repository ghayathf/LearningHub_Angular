import { Component, ViewChild } from '@angular/core';
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolutionService } from 'src/app/solution.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  @ViewChild('UpdateSolutionDialod') UpdateSolution: any
  @ViewChild('CreateSolutionForm') CreateSolution: any
  section: any
  taskss: any = []
  mats: any = []
  thisCourse: any
  coursename: any
  courseLevel: any
  constructor(public materialService: MaterialService, public courseService: CourseService, public dialog: MatDialog, public traineeSectionService: TraineeSectionService,
    public userService: UserService, public taskService: TaskService, public auth: AuthGuard, public sectionService: SectionService, public router: Router, public solutionService: SolutionService) { }

  user: any
  userobj: any
  trainees: any
  currTrainee: any
  ts: any
  sec: any
  course: any
  tasks: any = []
  material: any
  combinedObject: any
  combinedArray: any = []
  currentDate:any
  AllComments:any=[]
  commentsArr:any=[]
  commentDate:any
  async ngOnInit() {
    this.section = this.sectionService.section
    this.currentDate = new Date(Date.now()).toISOString().slice(0, 10)
    this.user = this.auth.gh
    await this.traineeSectionService.GetAllTrainees()
    this.trainees = this.traineeSectionService.allTrainees
    await this.traineeSectionService.GetAllTraineeSection()
    await this.userService.getUserById(this.user)
    await this.userService.getAllUsers()
    await this.sectionService.GetAllSections()
    await this.courseService.GetAllCourses()
    await this.taskService.GetAllTasks()
    await this.materialService.GetAllMaterial()
    await this.sectionService.GetAllComments()
    this.userobj = this.userService.user
    this.currTrainee = this.trainees.find((x: { user_Id: any; }) => x.user_Id === this.user)
    this.ts = this.traineeSectionService.TraineeSections.find((x: { trainee_Id: any; }) => x.trainee_Id == this.currTrainee.traineeid)
    this.sec = this.sectionService.sections.find((x: { sectionid: any; }) => x.sectionid == this.ts.section_id)
    this.course = this.courseService.courses.find((x: { courseid: any; }) => x.courseid == this.sec.course_Id)
    this.tasks = this.taskService.tasks.filter((x: { sectionidd: any; }) => x.sectionidd == this.sec.sectionid)
    this.material = this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.sec.sectionid)
    this.combinedArray = this.traineeSectionService.TraineeSections.filter((x: { trainee_Id: number; }) => x.trainee_Id === this.currTrainee.traineeid).map((ts: any) => {
      const section = this.sectionService.sections.find((sec: any) => sec.sectionid == ts.section_id);
      const course = this.courseService.courses.find((x: any) => x.courseid == section.course_Id)
      return { ...ts, ...section, ...course };
    });
    this.commentsArr = this.sectionService.Comments.filter((x: { section_Id: any; })=>x.section_Id == this.sec.sectionid).map((com:any)=>
    {
      const user = this.userService.users.find((x: { userid: any; })=>x.userid == com.user_Id)
      return{...user,...com}
    })
    console.log(this.commentsArr);



    await this.taskService.GetAllTasks()
    await this.materialService.GetAllMaterial()
    await this.courseService.GetAllCourses()
    this.tasks = await this.taskService.tasks.filter((x: { sectionidd: any; }) => x.sectionidd == this.section.sectionid)
    this.mats = await this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.section.sectionid)
    this.thisCourse = await this.courseService.courses.find((x: { courseid: any; }) => x.courseid == this.section.course_Id)
    this.coursename = await this.thisCourse.coursename
    if (this.thisCourse.courselevel == 1)

      this.courseLevel = Levels[1]

    else if (this.course.courselevel == 2)

      this.courseLevel = Levels[2]

    else

      this.courseLevel = Levels[3]
  }

  submitAttendance() { }
  OpenDialog() { }
  async downloadFile(t: any) {
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
    URL.revokeObjectURL(url);
  }
  openDeleteDialog(t: any) { }
  openUpdateDialog(t: any) { }

  taskfile: any;
  async downloadTask(id: number) {

    await this.taskService.GetTaskById(id);
    this.taskfile = this.taskService.Task.taskfile;
    const filePath = "../../../assets/HomeAssets/Task/" + this.taskfile;

    const response = await fetch(filePath);
    const lastDotIndex = filePath.lastIndexOf(".");
    const slicedStr = filePath.slice(lastDotIndex + 1);
    const blob = await response.blob();

    // Create a URL for the Blob using createObjectURL
    const url = URL.createObjectURL(blob);

    // Create an anchor tag and trigger the download by simulating a click
    const a = document.createElement('a');
    a.href = url;
    a.download = this.taskService.Task.tasktype + '.' + slicedStr;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the object URL after the download is complete
    URL.revokeObjectURL(url);
  }

  SolutionForm = new FormGroup(
    {

      solutionmark: new FormControl(''),
      solutionfile: new FormControl(''),
      submitionnote: new FormControl('', Validators.required),
      t_S_Id: new FormControl(''),
      task_Id: new FormControl('')

    }
  )
  UpdateSolutionForm = new FormGroup(
    {
      solutionid: new FormControl(''),
      solutionmark: new FormControl(''),
      solutionfile: new FormControl(''),
      submitionnote: new FormControl('', Validators.required),
      t_S_Id: new FormControl(''),
      task_Id: new FormControl('')

    }
  )
  slectedtaskid:any
  SelectedSolid:any
   flag:any
  async CallSolutionDialog(taskid: number)
  {
    this.slectedtaskid = taskid;
    await this.solutionService.GetAllSolution();
    for (const element of this.solutionService.Solutions) {
      if (element.task_Id === taskid && element.t_S_Id === this.ts.tsid) {
        this.flag = 1;
        this.SelectedSolid = element.solutionid;
        break;
      } else {
        this.flag = 0;

      }
    }
    if(this.flag==1){
    this.OpenUpdateSolution(this.SelectedSolid);
    }
    else if(this.flag==0){
      this.OpenSolutionDialog( this.slectedtaskid);
    }

  }
  async OpenUpdateSolution(Solid: number) {

    await this.solutionService.GetSolutionById(Solid);

    await this.UpdateSolutionForm.patchValue(this.solutionService.solutionByIDD);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.UpdateSolution, dialogConfig)
  }
  async UpdateSolutionnn() {
    this.UpdateSolutionForm.controls['t_S_Id'].setValue(this.ts.tsid);
    this.UpdateSolutionForm.controls['task_Id'].setValue(this.slectedtaskid);
    this.UpdateSolutionForm.controls['solutionid'].setValue(this.SelectedSolid);
debugger
    await this.solutionService.UpdateSolution(this.UpdateSolutionForm.value);
  }
  selectedSol: any
  UploadSol(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.solutionService.UploadSolution(formdata);
    }
    this.selectedSol = input
  }

  TaskID: any
  OpenSolutionDialog(id: any) {
    this.TaskID = id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.CreateSolution, dialogConfig)
  }
  soltuionFile: any;
  async downloadSolution()
  {
      await this.solutionService.GetSolutionById(this.SelectedSolid);
      this.soltuionFile = this.solutionService.solutionByIDD.solutionfile;
      const filePath = "../../../assets/HomeAssets/Solution/" + this.soltuionFile;

      const response = await fetch(filePath);
      const lastDotIndex = filePath.lastIndexOf(".");
      const slicedStr = filePath.slice(lastDotIndex + 1);
      const blob = await response.blob();

      // Create a URL for the Blob using createObjectURL
      const url = URL.createObjectURL(blob);

      // Create an anchor tag and trigger the download by simulating a click
      const a = document.createElement('a');
      a.href = url;
      a.download = this.solutionService.solutionByIDD.solutionfile + '.' + slicedStr;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Release the object URL after the download is complete
      URL.revokeObjectURL(url);

  }
  async CreateSoltuion() {
    this.SolutionForm.controls['t_S_Id'].setValue(this.ts.tsid);
    this.SolutionForm.controls['task_Id'].setValue(this.TaskID);
    await this.solutionService.CreateSoltuion(this.SolutionForm.value);
  }
  sliceDate(d: any) {
    return d.slice(0, 10)
  }


  CommentForm = new FormGroup(
    {

      commentmessage: new FormControl('',Validators.required),
      datepublished: new FormControl(''),
      user_Id: new FormControl('', Validators.required),
      section_Id: new FormControl('')

    }
  )
  CreateComment(){
    this.commentDate = new Date(Date.now())
    this.CommentForm.controls['datepublished'].setValue(this.commentDate)
    this.CommentForm.controls['user_Id'].setValue(this.user)
    this.CommentForm.controls['section_Id'].setValue(this.sec.sectionid)
    this.sectionService.CreateComment(this.CommentForm.value)
    this.sectionService.GetAllComments()
  }
}
enum Levels {

  Beginner = 1,

  Intermediate = 2,

  Advanced = 3,

}
