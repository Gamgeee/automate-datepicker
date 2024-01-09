import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Day } from '../../models/day';
import { Month } from '../../models/month';

@Component({
    selector: 'automate-datepicker-days-calendar',
    templateUrl: './automate-datepicker-days-calendar.component.html',
    styleUrls: ['./automate-datepicker-days-calendar.component.scss']
})
export class AutomateDatePickerDaysCalendarComponent implements OnInit {
    @Input()
    public currentMonth: Month;

    @Output()
    public onDaySelected = new EventEmitter<Day>();

    public daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    constructor() { }

    public ngOnInit(): void {
    }

    public selectDay(day: Day): void {
        if (day.isDisabled) {
            return;
        }

        this.onDaySelected.emit(day);
    }
}
