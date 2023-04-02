import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseService } from 'src/app/course.service';
import { MaterialService } from 'src/app/material.service';
import { TraineeSectionService } from 'src/app/trainee-section.service';
import { TrainerService } from 'src/app/trainer.service';
import { UserService } from 'src/app/user.service';
import { TaskService } from 'src/app/task.service';
import { DatePipe } from '@angular/common';
import { SolutionService } from 'src/app/solution.service';
import { SectionService } from 'src/app/section.service';
import { AuthGuard } from 'src/app/auth.guard';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-course-detailed',
  templateUrl: './course-detailed.component.html',
  styleUrls: ['./course-detailed.component.css']
})
export class CourseDetailedComponent {
  @ViewChild('CreateForm') Create: any
  @ViewChild('UpdateForm') Update: any
  @ViewChild('DeleteForm') Delete: any
  @ViewChild('CreateTaskForm') CreateTaskForm: any

  @ViewChild('DeleteTaskForm') DeleteTask2: any
  @ViewChild('UpdateTaskForm') UpdateTask: any
  @ViewChild('ShowSolution') SolDialog: any
  @ViewChild('CreateMarkSolution') SolMark:any
  @ViewChild('TraineeSolutions') traineeSolutions:any
  constructor(public materialService: MaterialService, public courseService: CourseService, public dialog: MatDialog, public traineeSectionService: TraineeSectionService,
    public userService: UserService, public taskService: TaskService, public auth: AuthGuard, public soltionService: SolutionService,public sectionService:SectionService,
     public trainerService:TrainerService,public spinner:NgxSpinnerService) { }

  CreateMaterialForm = new FormGroup(
    {
      dateuploaded: new FormControl(''),
      materialname: new FormControl('', Validators.required),
      section_Id: new FormControl(''),
      filepath: new FormControl('')
    }
  )
  UpdateMaterialForm = new FormGroup(
    {
      materialid: new FormControl(''),
      dateuploaded: new FormControl(''),
      materialname: new FormControl('', Validators.required),
      section_Id: new FormControl(''),
      filepath: new FormControl('')
    }
  )
  CreateTaskFormm = new FormGroup(
    {
      tasktype: new FormControl('', Validators.required),
      starttime: new FormControl('', Validators.required),
      endtime: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      taskstatus: new FormControl(''),
      taskfile: new FormControl(''),
      tasknote: new FormControl('', Validators.required),
      sectionidd: new FormControl('')

    }
  )
  UpdateTaskFormm = new FormGroup(
    {
      taskid: new FormControl(''),
      tasktype: new FormControl('', Validators.required),
      starttime: new FormControl('', Validators.required),
      endtime: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      taskstatus: new FormControl(''),
      taskfile: new FormControl(''),
      tasknote: new FormControl('', Validators.required),
      sectionidd: new FormControl('')

    }
  )
    MarkForm = new FormGroup(
    {
      solutionid: new FormControl(''),
      solutionmark: new FormControl('', Validators.required)
    }
  )


  MaterialFile: any
  categoryImg?: string
  async openUpdateDialog(materialId: number) {
    await this.materialService.GetMaterialById(materialId);
    this.MaterialFile = this.materialService.Material.filepath;
    await this.UpdateMaterialForm.patchValue(this.materialService.Material);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.categoryImg = this.materialService.Material.filePath;
    this.dialog.open(this.Update, dialogConfig);
  }

  tasks: any;

  currentDate?: any
  OpenDialog() {
    this.currentDate = new Date(Date.now());
    this.dialog.open(this.Create)
  }
  selectdSectionId: any;
  materials: any;
  traineeSection: any = []
  trainee: any = []
  users: any = []
  combinedArray: any = []
  AllComments:any=[]
  commentsArr:any=[]
  commentDate:any
  userobj: any
  trainees: any
  sec: any
  user: any
  finalArr:any=[]
  course:any
  courseName:any
  courseDesc:any
  courseLevel:any
  courseImage:any
  startTime:any
  endTime:any
  capacity:any
  myarr:any
  Trimg:any
  taskweight:any
  async ngOnInit() {
    this.selectdSectionId = this.courseService.selectedSectionId;
    await this.sectionService.GetSectionInfo(this.selectdSectionId)
    await this.traineeSectionService.GetAllSecTrainees(this.selectdSectionId)
    await this.taskService.GetAllTasks();
    await this.sectionService.GetCommentsBySection(this.selectdSectionId)
    this.startTime = this.sectionService.mySec[0].startdate.slice(0,10)
    this.endTime = this.sectionService.mySec[0].enddate.slice(0,10)
    this.capacity = this.sectionService.mySec[0].sectioncapacity
    this.courseLevel = Levels[this.sectionService.mySec[0].courselevel]
    this.courseName = this.sectionService.mySec[0].coursename
    this.courseDesc = this.sectionService.mySec[0].coursedescription
    this.courseImage = this.sectionService.mySec[0].courseimage
    this.materials = this.sectionService.mySec
    this.trainee = this.traineeSectionService.secTrainees
    this.Trimg=this.auth.loggedUser.Imagename
    // console.log( this.auth.loggedUser);

    this.combinedArray = this.traineeSectionService.secTrainees.map((x: any)=>{
    const attendance = true
    return {...x,attendance}
   })
    this.tasks = this.taskService.tasks.filter((x: { sectionidd: any; }) => x.sectionidd == this.selectdSectionId)
    this.user = this.auth.gh
    this.trainees = this.traineeSectionService.allTrainees
    this.commentsArr = this.sectionService.myComments
  }

  absentArr: any[] = []
  idd: any
  async markAbsent(id: number) {
    this.idd = await this.traineeSection.find((item: { trainee_Id: number; }) => item.trainee_Id === id);
    this.absentArr.push(this.idd)


  }
  absenceobj: any
  currDate?: any
  selectedDate: Date | undefined;
  async submitAttendance() {
    console.log(this.combinedArray);

    for (let i = 0; i < this.combinedArray.length; i++) {
      if (this.combinedArray[i].attendance == true) {
        this.traineeSectionService.CreateAbsence(this.combinedArray[i].tsid)

       await this.sectionService.GetSectionById(this.combinedArray[i].section_id)

      /*await this.courseService.GetCourseById( this.sectionService.section.course_Id) */

      await this.trainerService.GetTrainerById(this.sectionService.section.trainer_Id)

      await this.userService.getUserById(this.user)

        await this.sendEmail(this.combinedArray[i].firstname,this.sectionService.mySec[0].coursename,this.userService.user.firstname,this.userService.user.lastname,this.combinedArray[i].email);

      }
      else {
        this.traineeSectionService.CreateAttendance(this.combinedArray[i].tsid)
      }
    }
  }

  async CreateMaterial() {
    this.CreateMaterialForm.controls['dateuploaded'].setValue(this.currentDate);
    this.CreateMaterialForm.controls['section_Id'].setValue(this.selectdSectionId);

    await this.materialService.CreateMaterial(this.CreateMaterialForm.value)
    await this.materialService.GetAllMaterial();
    this.materials = this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.selectdSectionId)

  }
  async UpdateMaterial() {
    await this.materialService.UpdateMaterial(this.UpdateMaterialForm.value);
    await this.materialService.GetAllMaterial();
    this.materials = this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.selectdSectionId)

  }

  selectedFile: any
  UploaMaterial(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.materialService.UploadFile(formdata);
    }
    this.selectedFile = input
  }
  selectedItem = 0
  openDeleteDialog(MaterialId: number) {
    this.selectedItem = MaterialId
    this.dialog.open(this.Delete)
  }
  async DeleteMaterial() {
    await this.materialService.DeleteMaterial(this.selectedItem)
    await this.materialService.GetAllMaterial();
    this.materials = this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.selectdSectionId)
  }
  material: any;
  async downloadFile(id: number) {

    await this.materialService.GetMaterialById(id);
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

  selectedTask: any
  UploadTask(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.taskService.UploadTask(formdata);
    }
    this.selectedTask = input
  }
  OpenCreateTaskDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.CreateTaskForm, dialogConfig)
  }
  formattedDate: any;
  formattedDate2: any;
  async CreateTask() {
    //this.CreateTaskFormm.controls['taskstatus'].setValue(0);
    this.CreateTaskFormm.controls['sectionidd'].setValue(this.selectdSectionId);


    const datePipe = new DatePipe('en-US');

    this.formattedDate = datePipe.transform(this.CreateTaskFormm.controls['starttime'].value, 'yyyy-MM-ddTHH:mm:ss');

    this.formattedDate2 = datePipe.transform(this.CreateTaskFormm.controls['endtime'].value, 'yyyy-MM-ddTHH:mm:ss');


    this.CreateTaskFormm.controls['starttime'].setValue(String(this.formattedDate));
    this.CreateTaskFormm.controls['endtime'].setValue(String(this.formattedDate2));
    await this.taskService.CreateTask(this.CreateTaskFormm.value)
    await this.taskService.GetAllTasks();
    this.tasks = this.taskService.tasks.filter((x: { sectionidd: any; }) => x.sectionidd == this.selectdSectionId)

  }

  async DeleteTask() {
    await this.taskService.deleteTask(this.selectedTask2);
    await this.taskService.GetAllTasks();
    this.tasks = this.taskService.tasks.filter((x: { sectionidd: any; }) => x.sectionidd == this.selectdSectionId)
  }
  solsArr:any
  solutions:any=[]
  async OpenSolsDialog(id:any){
    this.solsArr = this.combinedArray.find((x: { tsid: any; })=> x.tsid == id)
    console.log(this.solsArr);

    await this.soltionService.GetAllSolution()
    await this.taskService.GetAllTasks()
    this.solutions = this.soltionService.Solutions.filter((x: { t_S_Id: any; })=>x.t_S_Id == this.solsArr.tsid).map((t: { task_Id: any; })=>{
      const task = this.taskService.tasks.find((ta: { taskid: any; })=>ta.taskid == t.task_Id);
      return {...t,...task}
    })

    console.log(this.solutions);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.traineeSolutions, dialogConfig)

  }

  selectedTask2 = 0;
  openDeleteTask(TaskId: number) {
    this.selectedTask2 = TaskId
    this.dialog.open(this.DeleteTask2)
  }

  //Update Task
  selectedFileTask: any
  UploaTask(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.taskService.UploadTask(formdata);
    }
    this.selectedFile = input
  }


  async UpdateFileTask() {
    await this.taskService.UpdateTaskFile(this.UpdateTaskFormm.value);
    await this.taskService.GetAllTasks();
    this.tasks = this.taskService.tasks.filter((x: { sectionidd: any; }) => x.sectionidd == this.selectdSectionId)

  }
  async OpenUpdateTask(taskid: number) {

    await this.taskService.GetTaskById(taskid);
    await this.UpdateTaskFormm.patchValue(this.taskService.Task);


    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.UpdateTask, dialogConfig)
  }
  Sol: any
  TID:any
  traineesNames:any
  async OpenTaskSolutionDialog(ID: any) {


    this.TID=ID;
    await this.soltionService.GetAllTaskSolutions(ID);
    this.Sol = this.soltionService.taskSols
    this.taskweight = this.Sol[0].weight

    console.log(this.taskweight);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.SolDialog, dialogConfig)
  }

  soltuionFile: any;
  async downloadSolution(id:any)
  {
      await this.soltionService.GetSolutionById(id);
      this.soltuionFile = this.soltionService.solutionByIDD.solutionfile;
      const filePath = "../../../assets/HomeAssets/solution/" + this.soltuionFile;

      const response = await fetch(filePath);
      const lastDotIndex = filePath.lastIndexOf(".");
      const slicedStr = filePath.slice(lastDotIndex + 1);
      const blob = await response.blob();

      // Create a URL for the Blob using createObjectURL
      const url = URL.createObjectURL(blob);

      // Create an anchor tag and trigger the download by simulating a click
      const a = document.createElement('a');
      a.href = url;
      a.download = this.soltionService.solutionByIDD.solutionfile + '.' + slicedStr;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Release the object URL after the download is complete
      URL.revokeObjectURL(url);

  }
  SolID:any
  async OpenMarkDialog(ID: any) {
    this.SolID=ID;
    await this.soltionService.GetSolutionById(ID);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.SolMark,dialogConfig)
  }
  async GiveMark()
  { this.MarkForm.controls['solutionid'].setValue(this.SolID);
    await this.soltionService.GiveSolutionMark(this.MarkForm.value);
    await this.OpenTaskSolutionDialog(this.TID);
  }
  async sendEmail(traineename:string , coursename:string,trainerFname:string,TrainerLname:string,email:string) {
    const emailParams = {
      to_name: traineename,
      CourseName: coursename,
      TrainerFname: trainerFname,
      TrainerLname: TrainerLname,
      CuurentDate: new Date(Date.now()).toISOString().slice(0, 10),
      email: email
      };
      debugger
      await this.trainerService.AbsenceEmail(emailParams);
    }

    CommentForm = new FormGroup(
      {

        commentmessage: new FormControl('',Validators.required),
        datepublished: new FormControl(''),
        user_Id: new FormControl('', Validators.required),
        section_Id: new FormControl('')

      }
    )
    async CreateComment(){
      this.commentDate = await new Date(Date.now())
      await this.CommentForm.controls['datepublished'].setValue(this.commentDate)
      await this.CommentForm.controls['user_Id'].setValue(this.user)
      await this.CommentForm.controls['section_Id'].setValue(this.selectdSectionId)
      await this.sectionService.CreateComment(this.CommentForm.value)
      this.ngOnInit()
    }
}
enum Levels {

  Beginner = 1,

  Intermediate = 2,

  Advanced = 3,

}
