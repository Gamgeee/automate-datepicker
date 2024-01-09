import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Day } from '../models/day';
import { Month } from '../models/month';
import { Year } from '../models/year';
import { EAutomateDatepickerCalendarMode } from '../enums/e-automate-datepicker-calendar-mode';
import { YearsRange } from '../models/years-range';
import { DatePickerConfig } from '../models/datepicker-config';

@Component({
    selector: 'automate-datepicker-calendar',
    templateUrl: './automate-datepicker-calendar.component.html',
    styleUrls: ['./automate-datepicker-calendar.component.scss']
})
export class AutomateDatePickerCalendarComponent implements OnInit {
    @Input()
    public set selectedDate(value: Date) {
        this._selectedDate = value;

        this._setCurrentMonthAndYear();
    }
    public get selectedDate(): Date {
        return this._selectedDate;
    }

    @Input()
    public set config(value: DatePickerConfig) {
        this._config = value;

        this._updateDisabledState();
        this._updateCalendarMode();
        this._updateHightLightedState();
    }
    public get config(): DatePickerConfig {
        return this._config;
    }

    @Output()
    public onDaySelected = new EventEmitter<Day>();

    public EAutomateDatepickerCalendarMode = EAutomateDatepickerCalendarMode;

    public currentYearsRange: YearsRange;
    public currentYear: Year;
    public currentMonth: Month;

    public get mode(): EAutomateDatepickerCalendarMode { return this._mode; }

    private _selectedDate: Date;
    private _config: DatePickerConfig;
    private _mode: EAutomateDatepickerCalendarMode = EAutomateDatepickerCalendarMode.Days;

    private get _currentYearNumber(): number {
        return (this.selectedDate || new Date()).getFullYear();
    }

    private get _currentMonthNumber(): number {
        return (this.selectedDate || new Date()).getMonth();
    }

    private readonly _YEARS_AMOUNT_ON_CALENDAR = 16;

    constructor() { }

    public ngOnInit(): void {
    }

    public openDaysCalendar(): void {
        this._mode = EAutomateDatepickerCalendarMode.Days;
    }

    public openMonthsCalendar(): void {
        this._mode = EAutomateDatepickerCalendarMode.Months;
    }

    public openYearsCalendar(): void {
        this._createYearsRangeByCurrentYear();
        this._mode = EAutomateDatepickerCalendarMode.Years;
    }

    public nextYearsRange(): void {
        this._createYearsRange(this.currentYearsRange.startYear + this._YEARS_AMOUNT_ON_CALENDAR);
    }

    public prevYearsRange(): void {
        if (this.currentYearsRange.startYear - this._YEARS_AMOUNT_ON_CALENDAR < 1) {
            this._createYearsRange(1);
            return;
        }

        this._createYearsRange(this.currentYearsRange.startYear - this._YEARS_AMOUNT_ON_CALENDAR);
    }

    public yearSelected(yearNumber: number): void {
        this._setCurrentYear(yearNumber);
    }

    public monthSelected(monthNumber: number): void {
        this._setCurrentMonth(this.currentYear.yearNumber, monthNumber);
    }

    public daySelected(day: Day): void {
        this.selectedDate = day.dayDate;

        this.onDaySelected.emit(day);
    }


    private _setCurrentMonthAndYear(): void {
        this._setCurrentYear(this._currentYearNumber);

        this._setCurrentMonth(this._currentYearNumber, this._currentMonthNumber);
    }

    private _setCurrentMonth(yearNumber: number, monthNumber: number): void {
        this.currentMonth = new Month(yearNumber, monthNumber);

        this.currentMonth.updateSelectedDay(this.selectedDate);
        this.currentMonth.updateDisabledState(this.config);
        this.currentMonth.updateHightLighted(this.config);
    }

    private _setCurrentYear(yearNumber: number): void {
        this.currentYear = new Year(yearNumber, true, false);
        this.currentYear.updateSelectedMonth(this._currentYearNumber, this._currentMonthNumber);
        this.currentYear.updateIsSelected(this._currentYearNumber);
        this.currentYear.updateDisabledState(this.config);
    }

    private _createYearsRangeByCurrentYear(): void {
        if (!this.currentYear) {
            return;
        }

        const prevYearsAmount = Math.ceil(this._YEARS_AMOUNT_ON_CALENDAR / 2);

        const startYear = this.currentYear.yearNumber - prevYearsAmount;

        this._createYearsRange(startYear);
    }

    private _createYearsRange(startYearNumber: number): void {
        this.currentYearsRange = new YearsRange(startYearNumber, startYearNumber + this._YEARS_AMOUNT_ON_CALENDAR - 1);

        this.currentYearsRange.updateSelectedYear(this._currentYearNumber);
        this.currentYearsRange.updateDisabledState(this.config);
    }

    private _updateDisabledState(): void {
        if (!this.config) {
            return;
        }

        if (this.currentMonth) {
            this.currentMonth.updateDisabledState(this.config);
        }

        if (this.currentYear) {
            this.currentMonth.updateDisabledState(this.config);
        }

        if (this.currentYearsRange) {
            this.currentMonth.updateDisabledState(this.config);
        }
    }

    private _updateHightLightedState(): void {
        if (!this.config) {
            return;
        }

        if (this.currentMonth) {
            this.currentMonth.updateHightLighted(this.config);
        }
    }

    private _updateCalendarMode(): void {
        if (!this.config || !this.config.startView) {
            return;
        }

        if (this.config.startView === EAutomateDatepickerCalendarMode.Days) {
            this.openDaysCalendar();
        } else if (this.config.startView === EAutomateDatepickerCalendarMode.Months) {
            this.openMonthsCalendar();
        } else if (this.config.startView === EAutomateDatepickerCalendarMode.Years) {
            this.openYearsCalendar();
        }
    }
}
