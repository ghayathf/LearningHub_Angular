import { Component } from '@angular/core';
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css']
})
export class HomeFooterComponent {
  constructor(public Data: PagesService) { }

  ngOnInit() {
    this.Data.GetAllHome();
  }
}
