import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseService } from 'src/app/course.service';
import { MaterialService } from 'src/app/material.service';
import { TraineeSectionService } from 'src/app/trainee-section.service';
import { TrainerService } from 'src/app/trainer.service';
import { UserService } from 'src/app/user.service';
import { TaskService } from 'src/app/task.service';

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
  
  constructor(public materialService: MaterialService, public courseService: CourseService, public dialog: MatDialog, public traineeSectionService: TraineeSectionService,
    public userService: UserService, public taskService: TaskService) { }

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
      taskfile: new FormControl('', Validators.required),
      tasknote: new FormControl('', Validators.required),
      sectionidd: new FormControl('')

    }
  )

  MaterialFile: any
  categoryImg?: string
  async openUpdateDialog(materialId: number) {
    await this.materialService.GetMaterialById(materialId);
    this.MaterialFile = this.materialService.Material.filepath;
    await this.UpdateMaterialForm.patchValue(this.materialService.Material);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
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
  selectedCourseId: any;
  materials: any;
  traineeSection: any = []
  trainee: any = []
  users: any = []
  combinedArray: any = []
  async ngOnInit() {
    this.selectdSectionId = this.courseService.selectedSectionId;
    this.selectedCourseId = this.courseService.selectedCourseId;

    await this.materialService.GetAllMaterial();
    this.materials = this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.selectdSectionId)
    await this.traineeSectionService.GetAllTraineeSection()
    this.traineeSection = this.traineeSectionService.TraineeSections.filter((x: { section_id: any; }) => x.section_id === this.selectdSectionId)
    await this.traineeSectionService.GetAllTrainees()
    this.trainee = this.traineeSectionService.allTrainees
    this.trainee = this.trainee.filter((t: { traineeid: any; }) => {
      return this.traineeSection.filter((ts: { trainee_Id: any; }) => ts.trainee_Id === t.traineeid);
    });
    await this.userService.getAllUsers()
    this.users = this.userService.users
    this.users = this.users.filter((u: { userid: any; }) => {
      return this.trainee.some((ts: { user_Id: any; }) => ts.user_Id === u.userid);
    });

    this.combinedArray = this.users.filter((x: { roleId: number; }) => x.roleId == 2).map((user: any) => {
      const trainee = this.trainee.find((trainee: any) => trainee.user_Id === user.userid);
      const ts = this.traineeSection.find((ts:any)=>ts.trainee_Id == trainee.traineeid)
      const attendance = true
      return { ...user, ...trainee , ...ts, attendance};
    });

    console.log(this.combinedArray)

    await this.taskService.GetAllTasks();
    this.tasks = this.taskService.tasks.filter((x: { sectionidd: any; }) => x.sectionidd == this.selectdSectionId)
  }

  absentArr:any[] = []
  idd:any
  async markAbsent(id: number) {
    this.idd = await this.traineeSection.find((item: { trainee_Id: number; }) => item.trainee_Id === id);
    this.absentArr.push(this.idd)
    console.log(this.absentArr);
  }
  absenceobj:any
  currDate?:any
  selectedDate: Date | undefined;
  submitAttendance() {
    console.log(this.combinedArray);

    for (let i = 0; i < this.combinedArray.length; i++) {
      if(this.combinedArray[i].attendance == true){
      this.traineeSectionService.CreateAbsence(this.combinedArray[i].tsid)
        }
    else{
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
    this.dialog.open(this.CreateTaskForm,dialogConfig)
  }
  async CreateTask() {
    this.CreateTaskFormm.controls['taskstatus'].setValue("0");
    this.CreateTaskFormm.controls['sectionidd'].setValue(this.selectdSectionId);

    await this.taskService.CreateTask(this.CreateTaskFormm.value)
    await this.taskService.GetAllTasks();
    this.tasks = this.taskService.tasks.filter((x: { sectionidd: any; }) => x.sectionidd == this.selectdSectionId)

  }
}
