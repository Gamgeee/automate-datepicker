import { Component, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Day } from '../models/day';
import { Month } from '../models/month';
import { Year } from '../models/year';
import { EAutomateDatepickerCalendarMode } from '../enums/e-automate-datepicker-calendar-mode';
import { YearsRange } from '../models/years-range';
import { DatePickerConfig } from '../models/datepicker-config';
import { MonthChangedEvent } from '../events/month-changed-event';
import { Subscription } from 'rxjs';

@Component({
    selector: 'automate-datepicker-calendar',
    templateUrl: './automate-datepicker-calendar.component.html',
    styleUrls: ['./automate-datepicker-calendar.component.scss']
})
export class AutomateDatePickerCalendarComponent implements OnDestroy {
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
        this._config = DatePickerConfig.createDefaultOrUseExisting(value);

        this._setCurrentMonthAndYear();
        this._updateDisabledState();
        this._updateCalendarMode();
        this._updateHightLightedState();

        this._subscribeOnConfigUpdated();
    }
    public get config(): DatePickerConfig {
        return this._config;
    }

    @Output()
    public onDaySelected = new EventEmitter<Day>();

    @Output()
    public onMonthChanged = new EventEmitter<MonthChangedEvent>();

    @Output()
    public onYearChanged = new EventEmitter<number>();

    public EAutomateDatepickerCalendarMode = EAutomateDatepickerCalendarMode;

    public get mode(): EAutomateDatepickerCalendarMode { return this._mode; }

    public currentYearsRange: YearsRange;
    public currentYear: Year;
    public currentMonth: Month;

    private _selectedDate: Date;
    private _config: DatePickerConfig = DatePickerConfig.createDefaultOrUseExisting();
    private _mode: EAutomateDatepickerCalendarMode = EAutomateDatepickerCalendarMode.Days;

    private get _currentYearNumber(): number {
        return (this.selectedDate || new Date()).getFullYear();
    }

    private get _currentMonthNumber(): number {
        return (this.selectedDate || new Date()).getMonth();
    }

    private readonly _YEARS_AMOUNT_ON_CALENDAR = 16;

    private _configUpdatedSub: Subscription;

    constructor() { }

    public ngOnDestroy(): void {
        if (this._configUpdatedSub) {
            this._configUpdatedSub.unsubscribe();
        }
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
        this._selectedDate = day.dayDate;

        this.currentMonth.updateSelectedDay(this._selectedDate);

        this.onDaySelected.emit(day);
    }


    private _setCurrentMonthAndYear(): void {
        if (!this._config) {
            return;
        }

        this._setCurrentYear(this._currentYearNumber);

        this._setCurrentMonth(this._currentYearNumber, this._currentMonthNumber);
    }

    private _setCurrentMonth(yearNumber: number, monthNumber: number): void {
        const isChanged = !this.currentMonth || this.currentMonth.yearNumber !== yearNumber || this.currentMonth.monthNumber !== monthNumber;

        this.currentMonth = new Month(yearNumber, monthNumber, this._config);

        this.currentMonth.updateSelectedDay(this.selectedDate);
        this.currentMonth.updateDisabledState(this._config);
        this.currentMonth.updateHightLighted(this._config);

        if (isChanged) {
            this.onMonthChanged.emit({ year: this.currentMonth.yearNumber, monthNumber: this.currentMonth.monthNumber });
        }
    }

    private _setCurrentYear(yearNumber: number): void {
        const isChanged = !this.currentYear || this.currentYear.yearNumber !== yearNumber;

        this.currentYear = new Year(yearNumber, this._config, true, false);
        this.currentYear.updateSelectedMonth(this._currentYearNumber, this._currentMonthNumber);
        this.currentYear.updateIsSelected(this._currentYearNumber);
        this.currentYear.updateDisabledState(this._config);

        if (isChanged) {
            this.onYearChanged.emit(this.currentYear.yearNumber);
        }
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
        this.currentYearsRange = new YearsRange(startYearNumber, startYearNumber + this._YEARS_AMOUNT_ON_CALENDAR - 1, this._config);

        this.currentYearsRange.updateSelectedYear(this._currentYearNumber);
        this.currentYearsRange.updateDisabledState(this._config);
    }

    private _updateDisabledState(): void {
        if (this.currentMonth) {
            this.currentMonth.updateDisabledState(this._config);
        }

        if (this.currentYear) {
            this.currentMonth.updateDisabledState(this._config);
        }

        if (this.currentYearsRange) {
            this.currentMonth.updateDisabledState(this._config);
        }
    }

    private _updateHightLightedState(): void {
        if (!this._config) {
            return;
        }

        if (this.currentMonth) {
            this.currentMonth.updateHightLighted(this._config);
        }
    }

    private _updateCalendarMode(): void {
        if (!this._config || !this._config.startView) {
            return;
        }

        if (this._config.startView === EAutomateDatepickerCalendarMode.Days) {
            this.openDaysCalendar();
        } else if (this._config.startView === EAutomateDatepickerCalendarMode.Months) {
            this.openMonthsCalendar();
        } else if (this._config.startView === EAutomateDatepickerCalendarMode.Years) {
            this.openYearsCalendar();
        }
    }

    private _subscribeOnConfigUpdated(): void {
        if (this._configUpdatedSub) {
            this._configUpdatedSub.unsubscribe();
        }

        this._configUpdatedSub = this._config.onUpdated.subscribe(() => {
            this._updateDisabledState();
            this._updateHightLightedState();
            this._updateCalendarMode();
        });
    }
}
