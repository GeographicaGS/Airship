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

  /**
  * @ignore
  */
  _checked: boolean;
  /**
  * @ignore
  */
  @Output() checkedChange = new EventEmitter<boolean>();
  /**
  * For check the radio.
  */
  @Input() get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;

    this.checkedChange.emit(this._checked);
  }
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
    this._checked = !this._checked;
    this.valueChange.emit(this._checked);
  }

}
