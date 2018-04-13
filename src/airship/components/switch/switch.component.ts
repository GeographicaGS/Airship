import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ash-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input('checked') checked: string;

  constructor() { }

  ngOnInit() {
  }

}
