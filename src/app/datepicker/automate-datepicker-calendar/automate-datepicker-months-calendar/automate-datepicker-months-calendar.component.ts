import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Month } from '../../models/month';
import { Year } from '../../models/year';

@Component({
    selector: 'automate-datepicker-months-calendar',
    templateUrl: './automate-datepicker-months-calendar.component.html',
    styleUrls: ['./automate-datepicker-months-calendar.component.scss']
})
export class AutomateDatePickerMonthsCalendarComponent implements OnInit {
    @Input()
    public currentYear: Year;

    @Output()
    public onMonthSelected = new EventEmitter<number>();
    @Output()
    public onOpenDaysCalendar = new EventEmitter();

    constructor() { }

    public ngOnInit(): void {
    }

    public selectMonth(month: Month): void {
        this.onMonthSelected.emit(month.monthNumber);
        this.onOpenDaysCalendar.emit();
    }
}
