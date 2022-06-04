import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Year } from '../../models/year';
import { YearsRange } from '../../models/years-range';

@Component({
    selector: 'automate-datepicker-years-calendar',
    templateUrl: './automate-datepicker-years-calendar.component.html',
    styleUrls: ['./automate-datepicker-years-calendar.component.scss']
})
export class AutomateDatePickerYearsCalendarComponent {
    @Input()
    public currentYearsRange: YearsRange;

    @Output()
    public onYearSelected = new EventEmitter<number>();
    @Output()
    public onOpenMonthsCalendar = new EventEmitter();

    constructor() { }

    public selectYear(year: Year): void {
        if (year.isDisabled) {
            return;
        }

        this.onYearSelected.emit(year.yearNumber);
        this.onOpenMonthsCalendar.emit();
    }
}
