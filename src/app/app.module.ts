import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AirshipModule } from '../airship/airship.module';
// import { AirshipModule } from 'airship';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AirshipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
