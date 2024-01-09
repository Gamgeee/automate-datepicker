import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Year } from '../../models/year';
import { YearsRange } from '../../models/years-range';

@Component({
    selector: 'automate-datepicker-years-calendar',
    templateUrl: './automate-datepicker-years-calendar.component.html',
    styleUrls: ['./automate-datepicker-years-calendar.component.scss']
})
export class AutomateDatePickerYearsCalendarComponent implements OnInit {
    @Input()
    public currentYearsRange: YearsRange;

    @Output()
    public onYearSelected = new EventEmitter<number>();
    @Output()
    public onOpenMonthsCalendar = new EventEmitter();

    constructor() { }

    public ngOnInit(): void {
    }

    public selectYear(year: Year): void {
        this.onYearSelected.emit(year.yearNumber);
        this.onOpenMonthsCalendar.emit();
    }
}
