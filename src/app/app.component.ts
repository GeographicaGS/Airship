import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ash-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  rageValues = [100, 500];
  rageValue = [200];
  rageParseFunction = (value) => {
    if (value === 500) {
      return `Above ${500}`;
    }
    return value;
  }

  ngOnInit() {
  }

  valueRageChange(values) {
    console.log(values);
  }
}
