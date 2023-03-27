import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-update-about',
  templateUrl: './update-about.component.html',
  styleUrls: ['./update-about.component.css']
})
export class UpdateAboutComponent {
  CreateData = new FormGroup(
    {
      aboutimage: new FormControl('', Validators.required),
      paragraph1: new FormControl('', Validators.required),
      paragraph2: new FormControl('', Validators.required)
    }
  )

  UpdateData = new FormGroup(
    {
      aboutid: new FormControl(''),
      aboutimage: new FormControl('', Validators.required),
      paragraph1: new FormControl('', Validators.required),
      paragraph2: new FormControl('', Validators.required)
    }
  )


  constructor(public Data: PagesService) { }

  async ngOnInit() {
    await this.Data.GetAllAbout();
    await this.UpdateData.patchValue(this.Data.abouts[0]);
  }
  async UpdateAbout() {
    this.UpdateData.controls['aboutid'].setValue(this.Data.abouts[0].aboutid);
    await this.Data.UpdateAboutus(this.UpdateData.value);
    await this.Data.GetAllAbout();


  }

  currentImage: any
  UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.Data.UploadImage(formdata);
    }
  }





}
