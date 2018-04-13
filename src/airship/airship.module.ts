import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SwitchComponent } from './components/switch/switch.component';
import { RangeComponent } from './components/range/range.component';
import { PagerComponent } from './components/pager/pager.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

const components = [
  ButtonComponent,
  CheckboxComponent,
  SwitchComponent,
  RangeComponent,
  PagerComponent,
  DatePickerComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: components,
  exports : [...components]
})
export class AirshipModule { }