import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerActions } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/material.service';

@Component({
  selector: 'app-all-materials',
  templateUrl: './all-materials.component.html',
  styleUrls: ['./all-materials.component.css']
})
export class AllMaterialsComponent {
  /**
   *
   */

  constructor(public materialService:MaterialService, private router: Router, public dialog: MatDialog) {

  }
  ngOnInit() {
    this.materialService.GetAllMaterial();
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
  async searchBetweenInterval() {
    const filteredMaterials = this.materialService.materials.filter((material: { date: string | number | Date; }) => {
      const materialDate = new Date(material.date);
      return materialDate >= this.startDate && materialDate <= this.endDate;
    });

    this.materialService.searchedMat = filteredMaterials;
    console.log(this.materialService.searchedMat);
    console.log(this.startDate.toJSON());

    this.dialog.open(this.Search);
  }


  isDisabled = true
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
