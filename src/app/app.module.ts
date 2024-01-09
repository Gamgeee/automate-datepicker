import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AutomateDatePickerComponent } from './datepicker/automate-datepicker.component';
import { AutomateDatePickerDropdownComponent } from './datepicker/automate-datepicker-dropdown/automate-datepicker-dropdown.component';
import { AutomateDatePickerCalendarComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar.component';
import { AutomateDatePickerCalendarContainerComponent } from './datepicker/automate-datepicker-calendar-container/automate-datepicker-calendar-container.component';
import { AutomateDatePickerDaysCalendarComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-days-calendar/automate-datepicker-days-calendar.component';
import { AutomateDatePickerCalendarHeaderComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar-header/automate-datepicker-calendar-header.component';
import { ChevronComponent } from './datepicker/chevron/chevron.component';
import { AutomateDatePickerYearsCalendarComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-years-calendar/automate-datepicker-years-calendar.component';
import { AutomateDatePickerMonthsCalendarComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-months-calendar/automate-datepicker-months-calendar.component';
import { AutomateDatePickerCalendarYearsModeHeaderComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar-header/automate-datepicker-calendar-years-mode-header/automate-datepicker-calendar-years-mode-header.component';
import { AutomateDatePickerCalendarMonthsModeHeaderComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar-header/automate-datepicker-calendar-months-mode-header/automate-datepicker-calendar-months-mode-header.component';
import { AutomateDatePickerCalendarDaysModeHeaderComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar-header/automate-datepicker-calendar-days-mode-header/automate-datepicker-calendar-days-mode-header.component';
import { ClickOutsideDirective } from './click-outside-directive/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChevronComponent,
    AutomateDatePickerComponent,
    AutomateDatePickerCalendarContainerComponent,
    AutomateDatePickerCalendarComponent,
    AutomateDatePickerCalendarHeaderComponent,
    AutomateDatePickerCalendarYearsModeHeaderComponent,
    AutomateDatePickerCalendarMonthsModeHeaderComponent,
    AutomateDatePickerCalendarDaysModeHeaderComponent,
    AutomateDatePickerYearsCalendarComponent,
    AutomateDatePickerMonthsCalendarComponent,
    AutomateDatePickerDaysCalendarComponent,
    AutomateDatePickerDropdownComponent,

    ClickOutsideDirective
  ],
  entryComponents: [
    AutomateDatePickerDropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [AutomateDatePickerComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
