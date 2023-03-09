import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  },
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
constructor(private router:Router) {

}
GetValues(name:any)
{
  this.router.navigate(['/all-courses',name])
}
}
