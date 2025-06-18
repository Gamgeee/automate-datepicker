import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AutomateDatePickerModule } from 'projects/automate-datepicker/src/lib/automate-datepicker.module';
import { CommonModule } from '@angular/common';
import { AutomateTimepickerModule } from 'projects/automate-timepicker/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AutomateDatePickerModule,
    AutomateTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
