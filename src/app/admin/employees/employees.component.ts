import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrainerService } from 'src/app/trainer.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  title = 'angular-app';
  fileName = 'ExcelSheet.xlsx';


  @ViewChild('content', { static: false }) el!: ElementRef;

  @ViewChild('CreateForm') Create: any
  @ViewChild('UpdateForm') Update: any
  @ViewChild('DeleteForm') Delete: any
  @ViewChild('CreateTrainerrForm') CreateTrainer: any
  constructor(public trainerService: TrainerService, private router: Router, public dialog: MatDialog, public spinner: NgxSpinnerService) { }

  CreateUserForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      userpassword: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phonenumber: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      roleId: new FormControl('', Validators.required),
    }
  )
  ngOnInit() {
    this.trainerService.GetAllTrainers();
    console.log(this.trainerService.lastid);
  }
  CreateTrainerForm = new FormGroup(
    {
      salary: new FormControl('', Validators.required),
      trainerposition: new FormControl('', Validators.required),
      qualification: new FormControl('', Validators.required),
      user_Id: new FormControl('', Validators.required),
    }
  )
  OpenDialog() {
    this.dialog.open(this.Create)

  }
  userId: any
  async CreateUser() {
    await this.trainerService.CreateUser(this.CreateUserForm.value)
    this.dialog.open(this.CreateTrainer)
    await this.trainerService.GetAllTrainers()
    await this.trainerService.getAllUsersTrainers()
  }
  async CreateTrainerr() {
    this.CreateTrainerForm.controls['user_Id'].setValue(this.trainerService.lastid)
    this.trainerService.CreateTrainer(this.CreateTrainerForm.value)
    this.trainerService.GetAllTrainers()
  }
  selectedItem = 0
  openDeleteDialog(TrainerId: number) {
    this.selectedItem = TrainerId
    this.dialog.open(this.Delete)
    this.trainerService.GetAllTrainers()
  }

  async DeleteTrainer() {
    await this.trainerService.DeleteUser(this.selectedItem)
    this.trainerService.GetAllTrainers()
  }

  exportexcel() {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  hideActionColumn?: boolean = false;
  async MakePDF() {
    let pdf = new jsPDF();
    this.hideActionColumn = true;
    setTimeout(async () => {
      await autoTable(pdf, { html: "#excel-table" });
      this.hideActionColumn = false;
      await pdf.save("emp.pdf");
    }, 1000);
  }

}
