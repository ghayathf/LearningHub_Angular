import { Component } from '@angular/core';
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent {
  constructor(public Data: PagesService) { }
  ngOnInit() {
    this.Data.GetAllHome();
  }
}
