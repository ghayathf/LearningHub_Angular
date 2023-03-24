import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/course.service';
import { MaterialService } from 'src/app/material.service';
import { TraineeSectionService } from 'src/app/trainee-section.service';
import { TrainerService } from 'src/app/trainer.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-course-detailed',
  templateUrl: './course-detailed.component.html',
  styleUrls: ['./course-detailed.component.css']
})
export class CourseDetailedComponent {
  @ViewChild('CreateForm') Create: any
  @ViewChild('DeleteForm') Delete: any
  constructor(public materialService: MaterialService, public courseService: CourseService, public dialog: MatDialog,public traineeSectionService:TraineeSectionService,
    public userService:UserService) { }

  CreateMaterialForm = new FormGroup(
    {
      dateuploaded: new FormControl(''),
      materialname: new FormControl('', Validators.required),
      section_Id: new FormControl(''),
      filepath: new FormControl('')
    }
  )

  currentDate?: any
  OpenDialog() {
    this.currentDate = new Date(Date.now());
    this.dialog.open(this.Create)
  }
  selectdSectionId: any;
  selectedCourseId: any;
  materials: any;
  traineeSection:any = []
  trainee:any = []
  users :any = []
  combinedArray: any = []
  async ngOnInit() {
    this.selectdSectionId = this.courseService.selectedSectionId;
    this.selectedCourseId = this.courseService.selectedCourseId;

    await this.materialService.GetAllMaterial();
    this.materials = this.materialService.materials.filter((x: { section_Id: any; }) => x.section_Id == this.selectdSectionId)
    await this.traineeSectionService.GetAllTraineeSection()
    this.traineeSection = this.traineeSectionService.TraineeSections.filter((x: { section_id: any; })=>x.section_id === this.selectdSectionId)
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
      return { ...user, ...trainee };
    });
    console.log(this.combinedArray)



  }
  markAbsent(id: string) {

    const index = this.traineeSection.findIndex((item: { trainee_Id: string; }) => item.trainee_Id === id);

    /* if (index !== -1) {
      this.combinedArray[index].isAbsent = checked;
    } */
  }
  async CreateMaterial() {
    this.CreateMaterialForm.controls['dateuploaded'].setValue(this.currentDate);
    this.CreateMaterialForm.controls['section_Id'].setValue(this.selectdSectionId);

    await this.materialService.CreateMaterial(this.CreateMaterialForm.value)
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
