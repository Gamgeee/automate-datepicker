import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Day } from '../../models/day';
import { Month } from '../../models/month';
import { DatePickerConfig } from '../../models/datepicker-config';

@Component({
    selector: 'automate-datepicker-days-calendar',
    templateUrl: './automate-datepicker-days-calendar.component.html',
    styleUrls: ['./automate-datepicker-days-calendar.component.scss']
})
export class AutomateDatePickerDaysCalendarComponent {
    @Input()
    public config: DatePickerConfig;

    @Input()
    public currentMonth: Month;

    @Output()
    public onDaySelected = new EventEmitter<Day>();

    constructor() { }

    public selectDay(day: Day): void {
        if (day.isDisabled) {
            return;
        }

        this.onDaySelected.emit(day);
    }
}
