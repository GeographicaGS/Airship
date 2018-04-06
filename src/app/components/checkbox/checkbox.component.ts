import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ash-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input('class') class: string;
  @Input('checked') checked: string;

  constructor() { }

  ngOnInit() {
  }

}
