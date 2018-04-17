import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ash-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  checkedValue = true;
  switchValue = true;

  selectValues = [
    {value: 1, label: 'Valor 1'},
    {value: 2, label: 'Valor 2'},
    {value: 3, label: 'Valor 4'}
  ];

  datePickerValue = new Date('October 13, 2014 11:13:00');
  dateRangeValue = {
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 3))
  };

  rageValues = [100, 500];
  rageValue = [200];

  rageParseFunction = (value, index) => {
    if (value === 500) {
      return `Above ${500}`;
    }
    return value;
  }

  ngOnInit() {
  }

  valueChange(e) {
    console.log(e);
  }
}
