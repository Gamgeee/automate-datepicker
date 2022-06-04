import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';
import { Year } from '../../../models/year';
import { Month } from '../../../models/month';
import { DatePickerConfig } from '../../../models/datepicker-config';

@Component({
    selector: 'automate-datepicker-calendar-days-mode-header',
    templateUrl: './automate-datepicker-calendar-days-mode-header.component.html',
    styleUrls: ['./automate-datepicker-calendar-days-mode-header.component.scss',
        './../automate-datepicker-calendar-header.component.scss']
})
export class AutomateDatePickerCalendarDaysModeHeaderComponent {
    @Input()
    public currentYear: Year;

    @Input()
    public currentMonth: Month;

    @Input()
    public config: DatePickerConfig;

    @Output()
    public onYearSelected = new EventEmitter<number>();
    @Output()
    public onMonthSelected = new EventEmitter<number>();
    @Output()
    public onOpenMonthsCalendar = new EventEmitter();
    @Output()
    public onOpenYearsCalendar = new EventEmitter();

    public get isPrevMonthEnabled(): boolean {
        return !this.config ||
            !this.config.minDate ||
            (this.config.minDate.getFullYear() < this.currentMonth.yearNumber ||
                this.config.minDate.getMonth() < this.currentMonth.monthNumber);
    }

    public get isNextMonthEnabled(): boolean {
        return !this.config ||
            !this.config.maxDate ||
            (this.config.maxDate.getFullYear() > this.currentMonth.yearNumber ||
                this.config.maxDate.getMonth() > this.currentMonth.monthNumber);
    }

    constructor() { }

    public openMonthsCalendar(): void {
        this.onOpenMonthsCalendar.emit();
    }

    public openYearsCalendar(): void {
        this.onOpenYearsCalendar.emit();
    }

    public prevMonth(): void {
        if (!this.isPrevMonthEnabled) {
            return;
        }

        if (this.currentMonth.monthNumber === 0) {
            this.onYearSelected.emit(this.currentYear.yearNumber - 1);
            this.onMonthSelected.emit(11);
            return;
        }

        this.onMonthSelected.emit(this.currentMonth.monthNumber - 1);
    }

    public nextMonth(): void {
        if (!this.isNextMonthEnabled) {
            return;
        }

        if (this.currentMonth.monthNumber === 11) {
            this.onYearSelected.emit(this.currentYear.yearNumber + 1);
            this.onMonthSelected.emit(0);
            return;
        }

        this.onMonthSelected.emit(this.currentMonth.monthNumber + 1);
    }
}
