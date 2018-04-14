import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ash-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  /**
  * Style classes: primary, secondary or without class <br>
  * Size classes: large, small or not class <br>
  * Disabled class: disabled
  */
  @Input('class') class: string;
  /**
  * This icon will appear before text.
  * For a button with an icon and without text, do not use this input, use < ash-button > < img src="" > < ash-button > instead
  */
  @Input('icon') icon: string;

  constructor() { }

  ngOnInit() {
  }

}
