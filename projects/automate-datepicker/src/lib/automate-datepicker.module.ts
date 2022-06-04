import { NgModule } from '@angular/core';
import { AutomateDatePickerComponent } from './datepicker/automate-datepicker.component';
import { FormsModule } from '@angular/forms';
import { ChevronComponent } from './datepicker/chevron/chevron.component';
import { AutomateDatePickerCalendarContainerComponent } from './datepicker/automate-datepicker-calendar-container/automate-datepicker-calendar-container.component';
import { AutomateDatePickerCalendarComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar.component';
import { AutomateDatePickerCalendarHeaderComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar-header/automate-datepicker-calendar-header.component';
import { AutomateDatePickerCalendarYearsModeHeaderComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar-header/automate-datepicker-calendar-years-mode-header/automate-datepicker-calendar-years-mode-header.component';
import { AutomateDatePickerCalendarMonthsModeHeaderComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar-header/automate-datepicker-calendar-months-mode-header/automate-datepicker-calendar-months-mode-header.component';
import { AutomateDatePickerCalendarDaysModeHeaderComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-calendar-header/automate-datepicker-calendar-days-mode-header/automate-datepicker-calendar-days-mode-header.component';
import { AutomateDatePickerYearsCalendarComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-years-calendar/automate-datepicker-years-calendar.component';
import { AutomateDatePickerMonthsCalendarComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-months-calendar/automate-datepicker-months-calendar.component';
import { AutomateDatePickerDaysCalendarComponent } from './datepicker/automate-datepicker-calendar/automate-datepicker-days-calendar/automate-datepicker-days-calendar.component';
import { AutomateDatePickerDropdownComponent } from './datepicker/automate-datepicker-dropdown/automate-datepicker-dropdown.component';
import { CommonModule } from '@angular/common';
import { AppendToTemplateDirective } from './directives/append-to-template.directive';

@NgModule({
  declarations: [
    AppendToTemplateDirective,

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
  ],
  entryComponents: [
    AutomateDatePickerDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AutomateDatePickerComponent, AppendToTemplateDirective]
})
export class AutomateDatePickerModule { }
