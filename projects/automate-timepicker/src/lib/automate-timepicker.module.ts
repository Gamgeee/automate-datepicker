import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutomateTimePickerComponent } from './timepicker/automate-timepicker.component';
import { AutomateTimePickerClockComponent } from './timepicker/automate-timepicker-clock/automate-timepicker-clock.component';
import { AutomateTimePickerHoursClockComponent } from './timepicker/automate-timepicker-clock/automate-timepicker-hours-clock/automate-timepicker-hours-clock.component';
import { AutomateTimePickerMinutesClockComponent } from './timepicker/automate-timepicker-clock/automate-timepicker-minutes-clock/automate-timepicker-minutes-clock.component';
import { AutomateTimePickerClockHandComponent } from './timepicker/automate-timepicker-clock/automate-timepicker-clock-hand/automate-timepicker-clock-hand.component';
import { AutomateTimePickerPopupFooterComponent } from './timepicker/automate-timepicker-popup/automate-timepicker-popup-footer/automate-timepicker-popup-footer.component';
import { AutomateSharedModule } from 'projects/automate-shared/automate-shared.module';
import { AutomateTimePickerPopupHeaderComponent } from './timepicker/automate-timepicker-popup/automate-timepicker-popup-header/automate-timepicker-popup-header.component';
import { AutomateTimePickerPopupComponent } from './timepicker/automate-timepicker-popup/automate-timepicker-popup.component';

@NgModule({
  declarations: [
    AutomateTimePickerComponent,
    AutomateTimePickerClockComponent,
    AutomateTimePickerHoursClockComponent,
    AutomateTimePickerMinutesClockComponent,
    AutomateTimePickerClockHandComponent,
    AutomateTimePickerPopupComponent,
    AutomateTimePickerPopupHeaderComponent,
    AutomateTimePickerPopupFooterComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    AutomateSharedModule
  ],
  exports: [AutomateTimePickerComponent]
})
export class AutomateTimepickerModule { }
