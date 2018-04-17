import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  * @ignore
  */
  _checked: boolean;
  /**
  * @ignore
  */
  @Output() checkedChange = new EventEmitter<boolean>();
  /**
  * For check the checkbox.
  */
  @Input() get checked() {
    return this._checked;
  }
  set checked(checked) {
    this._checked = checked;
    this.checkedChange.emit(this._checked);
  }
  /**
  * Color will appear like a small circle beside text
  */
  @Input ('color') color: string;

  /**
  * Fuction will be fired when value changes
  */
  @Output('valueChange') valueChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  change() {
    this.checked = !this.checked;
    this.valueChange.emit(this.checked);
  }

}
