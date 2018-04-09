import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SwitchComponent } from './components/switch/switch.component';
import { RangeComponent } from './components/range/range.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CheckboxComponent,
    SwitchComponent,
    RangeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
