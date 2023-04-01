import { Component } from '@angular/core';
import { RegisterService } from 'src/app/register.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"
import { TrainerService } from 'src/app/trainer.service';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-registerd-user',
  templateUrl: './registerd-user.component.html',
  styleUrls: ['./registerd-user.component.css']
})
export class RegisterdUserComponent {
  constructor(public RegisterUser: RegisterService,public trainerService: TrainerService,public userService:UserService,public traineeService:RegisterService) { }
  fileName = 'ExcelSheet.xlsx';
  totalTrainers:any
  totalTrainees:any
  totalAdmins:any
  async ngOnInit() {
   await this.RegisterUser.getAllRegisterd();
   await this.trainerService.GetAllTrainers();
   await this.traineeService.GetAllAcceptedTrainee();
   await  this.userService.getAllUsers();
   this.totalTrainers=this.trainerService.tr.length;
   this.totalAdmins=this.userService.users.filter((x: { roleId: number; }) => x.roleId == 1).length;
   this.totalTrainees=this.traineeService.AcceptedTrainee.length
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
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;


    pdf.text("Register User Report", pdf.internal.pageSize.getWidth() / 2, 5, {
      align: 'center'
    });
    pdf.text("Date : " + formattedDate, pdf.internal.pageSize.getWidth() / 2, 11, {
      align: 'center'
    });

    pdf.save("Users.pdf");

  }
}
