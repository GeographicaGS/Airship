import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface SelectValues {
  value: any;
  label: string;
}

@Component({
  selector: 'ash-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  /**
  * Current value
  */
  @Input() value: SelectValues;
  /**
  * Drowdown values. Must be an object like {value:any, label:string}
  */
  @Input('values') values: Array<SelectValues> = [];
  /**
  * Fuction will be fired when value changes
  */
  @Output('valueChange') valueChange = new EventEmitter<Array<SelectValues>>();
  showDropdown = false;

  constructor() { }

  ngOnInit() {
  }

  focusout() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 100);
  }

  select(value) {
    this.value = value;
    this.valueChange.emit(value);
  }

}
