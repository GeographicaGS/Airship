import { Component, OnInit, Input } from '@angular/core';

/**
* Posible classes: disabled
*/
@Component({
  selector: 'ash-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  /**
  * For check the switch add checked to the component. It is not necessary to assign value
  */
  @Input('checked') checked: string;

  constructor() { }

  ngOnInit() {
  }

}
