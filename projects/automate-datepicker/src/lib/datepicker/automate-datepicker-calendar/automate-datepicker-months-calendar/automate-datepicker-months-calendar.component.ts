import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Month } from '../../models/month';
import { Year } from '../../models/year';

@Component({
    selector: 'automate-datepicker-months-calendar',
    templateUrl: './automate-datepicker-months-calendar.component.html',
    styleUrls: ['./automate-datepicker-months-calendar.component.scss']
})
export class AutomateDatePickerMonthsCalendarComponent {
    @Input()
    public currentYear: Year;

    @Output()
    public onMonthSelected = new EventEmitter<number>();
    @Output()
    public onOpenDaysCalendar = new EventEmitter();

    constructor() { }

    public selectMonth(month: Month): void {
        if (month.isDisabled) {
            return;
        }

        this.onMonthSelected.emit(month.monthNumber);
        this.onOpenDaysCalendar.emit();
    }
}
