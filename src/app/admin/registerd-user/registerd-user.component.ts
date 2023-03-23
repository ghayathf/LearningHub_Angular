import { Component } from '@angular/core';
import { RegisterService } from 'src/app/register.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"
@Component({
  selector: 'app-registerd-user',
  templateUrl: './registerd-user.component.html',
  styleUrls: ['./registerd-user.component.css']
})
export class RegisterdUserComponent {
  constructor(public RegisterUser: RegisterService) { }
  fileName = 'ExcelSheet.xlsx';
  ngOnInit() {
    this.RegisterUser.getAllRegisterd();
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

    pdf.save("Users.pdf");

  }
}
