import { Component, OnInit } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';

/**
* Posible classes: disabled
*/
@Component({
  selector: 'ash-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent extends CheckboxComponent {

}
