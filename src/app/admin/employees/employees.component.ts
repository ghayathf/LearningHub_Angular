import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrainerService } from 'src/app/trainer.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { UserService } from 'src/app/user.service';
import { RegisterService } from 'src/app/register.service';
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
  constructor(public trainerService: TrainerService, private router: Router, public dialog: MatDialog, public spinner: NgxSpinnerService,public userService:UserService,public traineeService:RegisterService) { }

  CreateUserForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      userpassword: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phonenumber: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      roleId: new FormControl(''),
    }
  )
  totalUsers:any
  totalTrainers:any
  totalTrainees:any
  async ngOnInit() {
  await this.trainerService.GetAllTrainers();
  // console.log(this.trainerService.lastid);
   await  this.userService.getAllUsers();
   await this.traineeService.GetAllAcceptedTrainee();
   this.totalTrainers=this.trainerService.tr.length;
   this.totalUsers=this.userService.users.length
   this.totalTrainees=this.traineeService.AcceptedTrainee.length
  
  }
  CreateTrainerForm = new FormGroup(
    {
      salary: new FormControl('', Validators.required),
      trainerposition: new FormControl('', Validators.required),
      qualification: new FormControl('', Validators.required),
      user_Id: new FormControl(''),
    }
  )
  OpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.Create,dialogConfig)

  }
  userId: any
  async CreateUser() {
    await this.trainerService.CreateUser(this.CreateUserForm.value)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    this.dialog.open(this.CreateTrainer,dialogConfig)
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
  MakePDF() {
    let pdf = new jsPDF();


    // pdf.addImage(imgData, 'JPEG', 15, 20, 30, 30)
    //  pdf.text('Paranyan loves jsPDF', 35, 25)

    autoTable(pdf, { html: "#excel-table" });

    pdf.save("emp.pdf");

  }

}
