import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Month } from '../../models/month';
import { Year } from '../../models/year';
import { EAutomateDatepickerCalendarMode } from '../../enums/e-automate-datepicker-calendar-mode';
import { YearsRange } from '../../models/years-range';
import { DatePickerConfig } from '../../models/datepicker-config';

@Component({
    selector: 'automate-datepicker-calendar-header',
    templateUrl: './automate-datepicker-calendar-header.component.html',
    styleUrls: ['./automate-datepicker-calendar-header.component.scss']
})
export class AutomateDatePickerCalendarHeaderComponent implements OnInit {
    @Input()
    public mode: EAutomateDatepickerCalendarMode;
    @Input()
    public currentYearsRange: YearsRange;
    @Input()
    public currentYear: Year;
    @Input()
    public currentMonth: Month;
    @Input()
    public config: DatePickerConfig;

    @Output()
    public onNextYearsRange = new EventEmitter();
    @Output()
    public onPrevYearsRange = new EventEmitter();
    @Output()
    public onYearSelected = new EventEmitter<number>();
    @Output()
    public onMonthSelected = new EventEmitter<number>();
    @Output()
    public onOpenMonthsCalendar = new EventEmitter();
    @Output()
    public onOpenYearsCalendar = new EventEmitter();

    public EAutomateDatepickerCalendarMode = EAutomateDatepickerCalendarMode;

    constructor() { }

    public ngOnInit(): void {
    }
}
