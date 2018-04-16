import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ash-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  /**
  * size of the loading
  */
  @Input('size') size = 72;

  constructor() { }

  ngOnInit() {
  }

}
