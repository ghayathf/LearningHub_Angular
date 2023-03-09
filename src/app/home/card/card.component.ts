import { Component, EventEmitter, Input,OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  /**
   *
   */
  constructor(private router:Router) {


  }
@Input() cardImage?:string
@Input() cardName?:string
@Input() cardDetails?:string

@Output() SendValues = new EventEmitter()
SendCourses(name?:string,image?:string,details?:string){
  const product = {
    proImage:image,
    proName:name,
    proDes:details
  }
  this.SendValues.emit(product)
  
}
}
