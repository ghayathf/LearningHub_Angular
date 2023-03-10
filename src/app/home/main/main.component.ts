import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  image:string=""
  name:string=""
  details:string=""
cats =
[
  {
    catImage:"../../../assets/HomeAssets/images/element/data-science.svg",
    catName:"AI",
    catDetails:"25 Hours"
  },
  {
    catImage:"../../../assets/HomeAssets/images/element/engineering.svg",
    catName:"IT & Software",
    catDetails:"35 Hours"
  },
  {
    catImage:"../../../assets/HomeAssets/images/element/engineering.svg",
    catName:"Engineering",
    catDetails:"70 Hours"
  },
  {
    catImage:"../../../assets/HomeAssets/images/element/coding.svg",
    catName:"Web Development",
    catDetails:"25 Hours"
  },
  {
    catImage:"../../../assets/HomeAssets/images/element/profit.svg",
    catName:"Finance",
    catDetails:"90 Hours"
  }
]
constructor(private router:Router,private spinner:NgxSpinnerService) {
}
ngOnInit() {
  /** spinner starts on init */
  this.spinner.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 3000);
  this.spinner.show("mySpinner", {
    type: "line-scale-party",
    size: "large",
    bdColor: "rgba(0, 0, 0, 1)",
    color: "red",
    template:
      "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />",
  });
}
GetValues(name:any)
{
  this.router.navigate(['/all-courses',name])
}
}
