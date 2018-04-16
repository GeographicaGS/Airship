import { Component, OnInit, Input } from '@angular/core';

/**
* Posible classes: error, disabled or without class
*/
@Component({
  selector: 'ash-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  /**
  * For check the checkbox add checked to the component. It is not necessary to assign value
  */
  @Input('checked') checked: string;
  /**
  * Color will appear like a small circle beside text
  */
  @Input ('color') color: string;

  constructor() { }

  ngOnInit() {
  }

}
