import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Month } from '../../models/month';
import { Year } from '../../models/year';
import { EAutomateDatepickerCalendarMode } from '../../enums/e-automate-datepicker-calendar-mode';
import { YearsRange } from '../../models/years-range';
import { DatePickerConfig } from '../../models/datepicker-config';
import { AutomateDatePickerCalendarDaysModeHeaderComponent } from './automate-datepicker-calendar-days-mode-header/automate-datepicker-calendar-days-mode-header.component';
import { AutomateDatePickerCalendarMonthsModeHeaderComponent } from './automate-datepicker-calendar-months-mode-header/automate-datepicker-calendar-months-mode-header.component';
import { AutomateDatePickerCalendarYearsModeHeaderComponent } from './automate-datepicker-calendar-years-mode-header/automate-datepicker-calendar-years-mode-header.component';

@Component({
    selector: 'automate-datepicker-calendar-header',
    standalone: true,
    imports: [
        CommonModule,
        AutomateDatePickerCalendarDaysModeHeaderComponent,
        AutomateDatePickerCalendarMonthsModeHeaderComponent,
        AutomateDatePickerCalendarYearsModeHeaderComponent,
    ],
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
