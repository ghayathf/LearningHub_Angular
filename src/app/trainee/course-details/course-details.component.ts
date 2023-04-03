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
import { CategoryService } from 'src/app/category.service';
import { RegisterService } from 'src/app/register.service';
import jsPDF from 'jspdf';

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
    public userService: UserService, public taskService: TaskService, public auth: AuthGuard, public sectionService: SectionService, public router: Router, public solutionService: SolutionService,
    public categoryService: CategoryService, public trainerService: TrainerService, public UserRegService: RegisterService) { }
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
  currentDate: any
  AllComments: any = []
  commentsArr: any = []
  commentDate: any
  categoryname: any
  desc: any
  img: any
  SD: any
  ED: any
  meeting: any
  TrainerImg: any
  Trainerfname: any
  Trainerlname: any
  Traineremail: any
  qualif: any
  imgg2: any
  SecCount: any
  pos: any
  TrainerUser: any
  thisTrainer: any
  SectionForTrainer:any
  name:any
  async ngOnInit() {

    await (this.currentDate = new Date(Date.now()).toISOString().slice(0, 10))
    await (this.user = this.auth.gh)
    this.name = this.auth.loggedUser.Firstname+" "+this.auth.loggedUser.Lastname

    await (this.section = this.sectionService.section)
    this.currTrainee = this.sectionService.selectedTraineeId
    await this.sectionService.GettsInfo(this.section.sectionid,this.sectionService.selectedTraineeId)


    await this.materialService.GetAllMaterial()
    await (this.userobj = this.userService.user)
    await (this.combinedArray = this.sectionService.currentts)
    await (this.ts = this.combinedArray[0])
    await (this.sec = this.combinedArray[0])
    await (this.course = this.combinedArray[0])
    await (this.tasks = this.combinedArray)
    await (this.material = this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.section.sectionid))
    await (this.meeting = this.combinedArray[0].meetingurl)
    await (this.TrainerImg = this.combinedArray[0].imagename)
    await (this.Trainerfname = this.combinedArray[0].firstname)
    await (this.Trainerlname = this.combinedArray[0].lastname)
    await (this.Traineremail = this.combinedArray[0].email)
    await (this.qualif = this.combinedArray[0].qualification)
    await (this.pos = this.combinedArray[0].trainerposition)
    await this.materialService.GetAllMaterial()
    await (this.mats = await this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.section.sectionid))
    await (this.coursename = await this.combinedArray[0].coursename)
    await (this.desc = this.combinedArray[0].coursedescription)
    await (this.img = this.combinedArray[0].courseimage)
    await (this.categoryname = this.combinedArray[0].categoryname)
    await (this.SD = this.combinedArray[0].startdate)
    await (this.ED = this.combinedArray[0].enddate)
    await (this.imgg2 = this.auth.loggedUser.Imagename)
    this.courseLevel = Levels[this.combinedArray[0].courselevel]
    await this.sectionService.GetCommentsBySection(this.section.sectionid)
    this.commentsArr = await this.sectionService.myComments
    await this.traineeSectionService.getAllCertificates(this.combinedArray[0].tsid,this.section.sectionid,this.currTrainee);
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
  slectedtaskid: any
  SelectedSolid: any
  flag: any
  async CallSolutionDialog(taskid: number) {
    this.slectedtaskid = taskid;
    await this.solutionService.GetAllSolution();
    if(this.solutionService.Solutions.length==0){this.flag = 0}
    // console.log(this.solutionService.Solutions);

    for (const element of this.solutionService.Solutions) {
      if (element.task_Id === taskid && element.t_S_Id === this.ts.tsid) {
        this.flag = 1;
        this.SelectedSolid = element.solutionid;
        break;
      } else {
        this.flag = 0;
      }
    }
    if (this.flag == 1) {
      this.OpenUpdateSolution(this.SelectedSolid);
    }
    else if (this.flag == 0) {
      this.OpenSolutionDialog(this.slectedtaskid);
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
  async downloadSolution() {
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

      commentmessage: new FormControl('', Validators.required),
      datepublished: new FormControl(''),
      user_Id: new FormControl('', Validators.required),
      section_Id: new FormControl('')

    }
  )
  CreateComment() {
    this.commentDate = new Date(Date.now())
    this.CommentForm.controls['datepublished'].setValue(this.commentDate)
    this.CommentForm.controls['user_Id'].setValue(this.user)
    this.CommentForm.controls['section_Id'].setValue(this.sec.sectionid)
    this.sectionService.CreateComment(this.CommentForm.value)
    this.ngOnInit()
  }
}
enum Levels {

  Beginner = 1,

  Intermediate = 2,

  Advanced = 3,

}
