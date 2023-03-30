import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerActions } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/material.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskService } from 'src/app/task.service';
import { SolutionService } from 'src/app/solution.service';


@Component({
  selector: 'app-all-materials',
  templateUrl: './all-materials.component.html',
  styleUrls: ['./all-materials.component.css']
})
export class AllMaterialsComponent {
  /**
   *
   */

  constructor(public materialService:MaterialService, private router: Router, public dialog: MatDialog,public spinner:NgxSpinnerService,public taskService:TaskService,public solutionService:SolutionService) {

  }
  totalMaterials:any
  totalTasks:any
  totalSolutions:any
  async ngOnInit() {
   await this.materialService.GetAllMaterial();
    this.totalMaterials=this.materialService.materials.length 
    await this.taskService.GetAllTasks()
    this.totalTasks = this.taskService.tasks.length
    await this.solutionService.GetAllSolution()
    this.totalSolutions = this.solutionService.Solutions.length
  }
  @ViewChild('CreateForm') Create: any
  @ViewChild('UpdateForm') Update: any
  @ViewChild('DeleteForm') Delete: any
  @ViewChild('DetailsForm') Details: any
  @ViewChild('Search') Search: any
  CreateMaterialForm = new FormGroup(
    {
    dateuploaded : new FormControl('',Validators.required),
    materialname : new FormControl('',Validators.required),
    section_Id : new FormControl('',Validators.required)
    }
  )
  startDate!: Date;
  endDate!: Date;
  SeachMaterialForm = new FormGroup(
    {
    DateFrom : new FormControl('',Validators.required),
    DateTo : new FormControl('',Validators.required),
    }
  )
  searchBetweenInterval() {
    this.spinner.show();
    this.materialService.searchMaterials(this.startDate, this.endDate).subscribe(
      {
        next: (res) => {
          this.spinner.hide();
          this.materialService.searchedMat = res;
          this.dialog.open(this.Search);
        },
        error: () => {
          this.spinner.hide();
          console.error('An error occurred while searching for materials');
        }
      }
    );
  }
  selectedItem = 0
  openDeleteDialog(MaterialId:number){
    this.selectedItem = MaterialId
    this.dialog.open(this.Delete)
  }
  async DeleteMaterial(){
    await this.materialService.DeleteMaterial(this.selectedItem)
    this.materialService.GetAllMaterial()
  }
  GetMaterialById(MaterialId: number) {
    this.materialService.GetMaterialById(MaterialId);
    this.router.navigate(["Admin/AllMaterials"]);
  }
  currentDate?: number
  OpenDialog() {
    this.currentDate = Date.now();
    this.dialog.open(this.Create)
  }

  async CreateMaterial(){

    await this.materialService.CreateMaterial(this.CreateMaterialForm.value)
    this.materialService.GetAllMaterial()
  }
}
