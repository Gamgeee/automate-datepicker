import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AutomateDatePickerModule } from 'projects/automate-datepicker/src/lib/automate-datepicker.module';
import { ModalModule } from 'ngx-bootstrap';
import { SimpleModalComponent } from './simple-modal.component';
import { CommonModule } from '@angular/common';
import { AutomateTimepickerModule } from 'projects/automate-timepicker/src/public_api';

@NgModule({
  declarations: [
    AppComponent,
    SimpleModalComponent
  ],
  entryComponents: [SimpleModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AutomateDatePickerModule,
    AutomateTimepickerModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
