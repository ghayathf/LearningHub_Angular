import { Component } from '@angular/core';
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  constructor(public Data: PagesService) { }
  async ngOnInit() {
    await this.Data.GetAllAbout();
  }
}
