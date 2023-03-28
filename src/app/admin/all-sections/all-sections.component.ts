import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SectionService } from 'src/app/section.service';
import { MatDatepicker, MatDatepickerActions } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatePipe, Time } from '@angular/common';
import { TrainerService } from 'src/app/trainer.service';
import { CourseService } from 'src/app/course.service';
import { UserService } from 'src/app/user.service';
import * as XLSX from 'xlsx';
import { RegisterService } from 'src/app/register.service';
import { TraineeSectionService } from 'src/app/trainee-section.service';

@Component({
  selector: 'app-all-sections',
  templateUrl: './all-sections.component.html',
  styleUrls: ['./all-sections.component.css'],
  providers: [DatePipe]
})

export class AllSectionsComponent {
  @ViewChild('CreateSection') Create: any
  @ViewChild('UpdateSection') Update: any
  @ViewChild('DeleteForm') Delete: any
  @ViewChild('DetailsForm') Details: any
  @ViewChild('ImportForm') Import: any

  constructor(public sectionService: SectionService, private router: Router, public dialog: MatDialog,
    public spinner: NgxSpinnerService, private formBuilder: FormBuilder, public trainerService: TrainerService, public courseService: CourseService, public userService: UserService, private datePipe: DatePipe, public traineeServie: RegisterService, public traineeSection: TraineeSectionService) { }

  users: any = []
  trainers: any = []
  combinedArray: any = []
  combinedArray1: any = []
  UserTrainer?: any
  currentDate: any
  compinedSections:any=[]
  async ngOnInit() {
    this.sectionService.GetAllSections()
    await this.userService.getAllUsers()
    await this.trainerService.GetAllTrainers()
    this.courseService.GetAllCourses()
    this.trainers = this.trainerService.trainers
    this.users = this.userService.users
    this.combinedArray = this.users.filter((x: { roleId: number; }) => x.roleId == 3).map((user: any) => {
      const trainer = this.trainers.find((trainer: any) => trainer.user_Id === user.userid)
      return { ...user, ...trainer };
    });

    console.log(this.combinedArray)
    this.currentDate = new Date(Date.now()).toISOString().slice(0, 10)
    this.compinedSections =this.sectionService.sections.map((item1:any) => {
      const matchingItem2 = this.trainers.find((item2:any) => item2.trainerid === item1.trainer_Id);

      const matchingItem3 = this.users.filter((item3:any) => item3.userid === matchingItem2.user_Id);

      const matchingItem4 = this.courseService.courses.find((item4:any) => item4.courseid === item1.course_Id);

      return {
        ...item1,
        ...matchingItem2,
        ...matchingItem3,
        ...matchingItem4
      };
    })
    this.combinedArray1 = this.users.filter((x: { roleId: number; }) => x.roleId == 3).map((user: any) => {
      const trainer = this.trainers.find((trainer: any) => trainer.user_Id === user.userid)

      return { ...user, ...trainer };
    });
    console.log(this.compinedSections)
  }
  GenerateCertificate(id: number) {
    this.sectionService.GenerateCertificate(1, id)
  }
  sliceDate(d: any) {
    return d.slice(0, 10)


  }
  selectdImportId: any;
  OpenImportDialog(sectionid: number) {
    this.selectdImportId = sectionid;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(this.Import, dialogConfig);
  }
  OpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(this.Create, dialogConfig)
  }
  CreateForm = new FormGroup(
    {
      starttime: new FormControl('', Validators.required),
      endtime: new FormControl('', Validators.required),
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required),
      meetingurl: new FormControl('', Validators.required),
      sectioncapacity: new FormControl('', Validators.required),
      course_Id: new FormControl('', Validators.required),
      trainer_Id: new FormControl('', Validators.required)
    }
  )
  UpdateForm = new FormGroup(
    {
      sectionid: new FormControl('', Validators.required),
      starttime: new FormControl('', Validators.required),
      endtime: new FormControl('', Validators.required),
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required),
      meetingurl: new FormControl('', Validators.required),
      sectioncapacity: new FormControl('', Validators.required),
      course_Id: new FormControl(''),
      trainer_Id: new FormControl('')
    }
  )


  trainees: any[] = [];


  selectedCourse: any
  selectedTrainer: any
  async CreateSections() {
    this.CreateForm.patchValue({
      course_Id: this.selectedCourse
    });
    this.CreateForm.patchValue({
      trainer_Id: this.selectedTrainer
    });
    await this.sectionService.CreateSection(this.CreateForm.value);
    this.sectionService.GetAllSections();

  }
  selectedItem: number = 0
  async openDeleteDialog(section_Id: number) {
    this.selectedItem = section_Id
    this.dialog.open(this.Delete)
  }
  async DeleteSection() {
    await this.sectionService.DeleteSection(this.selectedItem)
    this.sectionService.GetAllSections()
  }

  selectedUpdatedCourse: any
  selectedUpdatedTrainer: any
  section?: any
  courseName?: any
  trainerEmail?: any
  time1?: Time
  time2?: Time
  dateFormat: string = "2023-03-30";
  datetimeStart?: Date
  datetimeEnd?: Date
  async openUpdateDialog(sectionid: number) {
    await this.sectionService.GetSectionById(sectionid);
    await this.courseService.GetCourseById(this.sectionService.section.course_Id)
    await this.trainerService.GetTrainerById(this.sectionService.section.trainee_Id)
    await this.UpdateForm.patchValue(this.sectionService.section);
    this.section = this.sectionService.section
    this.selectedUpdatedCourse = this.sectionService.section.course_Id
    this.selectedUpdatedTrainer = this.sectionService.section.trainer_Id
    this.courseName = this.courseService.course.coursename
    for (let i = 0; i < this.combinedArray.length; i++) {
      if (this.combinedArray[i].trainer_Id == this.selectedUpdatedTrainer) {
        this.trainerEmail = this.combinedArray[i].email;
      }
    }
    this.time1 = this.sectionService.section.starttime
    this.time2 = this.sectionService.section.endtime
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(this.Update, dialogConfig);

  }

  async UpdateSectionForm() {
    const hours = this.time1?.hours;
    const minutes = this.time1?.minutes;
    if (hours !== undefined && minutes !== undefined) {
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      const isoString = date.toISOString();

      this.UpdateForm.patchValue({
        starttime: isoString
      });
    }
    const hourss = this.time2?.hours;
    const minutess = this.time2?.minutes;
    if (hourss !== undefined && minutess !== undefined) {
      const date = new Date();
      date.setHours(hourss);
      date.setMinutes(minutess);
      const isoString = date.toISOString();

      this.UpdateForm.patchValue({
        endtime: isoString
      });
    }
    this.UpdateForm.patchValue({
      course_Id: this.selectedUpdatedCourse
    });
    this.UpdateForm.patchValue({
      trainer_Id: this.selectedUpdatedTrainer
    });

    await this.sectionService.UpdateSection(this.UpdateForm.value);
    this.sectionService.GetAllSections();
  }
  async openDetailsDialog(sectionid: number) {

    await this.sectionService.GetSectionById(sectionid);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(this.Details, dialogConfig);
  }
  ExcelData: any;
  onFileSelected(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
    }


  }
  fileName = 'ExcelSheet.xlsx';
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
  Zero: any = 0;

  async InsertData() {
    for (let i = 0; i < this.ExcelData.length; i++) {
      const newTrainee = {
        trainee_Id: this.ExcelData[i].traineeid,
        section_Id: this.selectdImportId,
        totalmark: 0,
        t_S_Status: 0,
        totalattendance: 0
      };

      await this.traineeServie.GetTraineeById(this.ExcelData[i].traineeid);
      await this.userService.getUserById(this.traineeServie.TraineeByID.user_Id)
      await this.sectionService.GetSectionById(this.selectdImportId)
      await this.courseService.GetCourseById(this.sectionService.section.course_Id)
      this.trainees.push(newTrainee);
      this.sendEmail(this.ExcelData[i].firstname, this.userService.user.email, this.courseService.course.coursename)
    }
    for (let j = 0; j < this.trainees.length; j++) {
      await this.traineeSection.CreateTraineeSection(this.trainees[j]);
    }
  }
  async sendEmail(traineename: string, email: string, coursename: string) {
    const emailParams = {
      to_name: traineename,
      CourseName: coursename,
      email: email
    };
    debugger
    await this.traineeServie.EnrollmetEmail(emailParams);
  }
}
