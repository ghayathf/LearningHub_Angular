import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-update-home',
  templateUrl: './update-home.component.html',
  styleUrls: ['./update-home.component.css']
})
export class UpdateHomeComponent {
  CreateData = new FormGroup(
    {
      logo: new FormControl('', Validators.required),
      paragraph1: new FormControl('', Validators.required),
      paragraph2: new FormControl('', Validators.required),
      paragraph3: new FormControl('', Validators.required),
      companyaddress: new FormControl('', Validators.required),
      companyemail: new FormControl('', Validators.required),
      companyphonenumber: new FormControl('', Validators.required)
    }
  )


  UpdateData = new FormGroup(
    {
      homeid: new FormControl(''),
      logo: new FormControl('', Validators.required),
      paragraph1: new FormControl('', Validators.required),
      paragraph2: new FormControl('', Validators.required),
      paragraph3: new FormControl('', Validators.required),
      companyaddress: new FormControl('', Validators.required),
      companyemail: new FormControl('', Validators.required),
      companyphonenumber: new FormControl('', Validators.required)

    }
  )


  constructor(public Data: PagesService) { }

  async ngOnInit() {
    await this.Data.GetAllHome();
    await this.UpdateData.patchValue(this.Data.homes[0]);
  }
  async UpdateHome() {
    this.UpdateData.controls['homeid'].setValue(this.Data.homes[0].homeid);
    await this.Data.UpdateHome(this.UpdateData.value);
    await this.Data.GetAllHome();


  }

  currentImage: any
  UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.Data.UploadLogo(formdata);
    }
  }

}
