import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ash-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input('classes') classes: string;
  @Input('icon') icon: string;

  constructor() { }

  ngOnInit() {
  }

}
