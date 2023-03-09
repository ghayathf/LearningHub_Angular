import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
@Input() cardImage?:string
@Input() cardName?:string
@Input() cardDetails?:string


}
