import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseService } from 'src/app/course.service';
import { MaterialService } from 'src/app/material.service';
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
  constructor(public taskService: TaskService, public materialService: MaterialService, public courseService: CourseService, public dialog: MatDialog) { }

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



  CreateTaskForm = new FormGroup(
    {
      tasktype: new FormControl('', Validators.required),
      starttime: new FormControl('', Validators.required),
      endtime: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      taskstatus: new FormControl('', Validators.required),
      taskfile: new FormControl('', Validators.required),
      tasknote: new FormControl('', Validators.required),
      sectionidd: new FormControl('', Validators.required)

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
  async ngOnInit() {
    this.selectdSectionId = this.courseService.selectedSectionId;
    this.selectedCourseId = this.courseService.selectedCourseId;

    await this.materialService.GetAllMaterial();
    this.materials = this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.selectdSectionId)

    await this.taskService.GetAllTasks();
    this.tasks = this.taskService.tasks.filter((x: { sectionidd: any; }) => x.sectionidd == this.selectdSectionId)




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
    const blob = await response.blob();

    // Create a URL for the Blob using createObjectURL
    const url = URL.createObjectURL(blob);

    // Create an anchor tag and trigger the download by simulating a click
    const a = document.createElement('a');
    a.href = url;
    a.download = this.materialService.Material.materialname + '.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the object URL after the download is complete
    URL.revokeObjectURL(url);

  }



}
