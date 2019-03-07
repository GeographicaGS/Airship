import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
* Posible classes: error, disabled or without class
*/
@Component({
  selector: 'ash-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Output() checkedChange = new EventEmitter<boolean>();
  /**
  * For check the radio.
  */
  @Input() checked: boolean;
  /**
  * Color will appear like a small circle beside text
  */
  @Input ('color') color: string;

  /**
  * For name the radio.
  */
  @Input() name: string;

  /**
  * For value the radio.
  */
  @Input() value: string;

  /**
  * Fuction will be fired when value changes
  */
  @Output('valueChange') valueChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  change() {
    this.checked = true;
    this.valueChange.emit(this.value);
  }

}
