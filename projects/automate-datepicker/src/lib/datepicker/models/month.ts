import { Week } from './week';
import { Day } from './day';
import { DatePickerConfig } from './datepicker-config';
import { Constants } from '../../constants';
import { DateHelper } from '../../date.helper';

export class Month {
    public get isDisabled(): boolean { return this._isDisabled; }

    public get isSelected(): boolean { return this._isSelected; }

    public get yearNumber(): number { return this._yearNumber; }

    public get monthNumber(): number { return this._monthNumber; }

    public get monthLabel(): string { return this._monthLabel; }

    public get monthTitle(): string { return this._monthTitle; }

    public get selectedDay(): Day { return this._selectedDay; }

    public get weeks(): Week[] { return this._weeks; }


    private _isDisabled: boolean;
    private _isSelected: boolean;
    private _yearNumber: number;
    private _monthNumber: number;
    private _monthLabel: string;
    private _monthTitle: string;
    private _selectedDay: Day;
    private _weeks: Week[];

    constructor(yearNumber: number, monthNumber: number, config: DatePickerConfig, createWeeks: boolean = true) {
        this._yearNumber = yearNumber;
        this._monthNumber = monthNumber;

        this._monthLabel = DateHelper.toFormat(new Date(this._yearNumber, this._monthNumber, 1), config.monthLabel);
        this._monthTitle = DateHelper.toFormat(new Date(this._yearNumber, this._monthNumber, 1), config.monthTitle);

        if (createWeeks) {
            this._createWeeks(config);
        }
    }

    public updateIsSelected(selectedYearNumber: number, selectedMonthNumber: number): void {
        this._isSelected = (this._yearNumber === selectedYearNumber && this._monthNumber === selectedMonthNumber);
    }

    public updateSelectedDay(date: Date): void {
        this._weeks.forEach(w => w.updateSelectedDay(date));

        this._weeks.forEach(w => {
            const selectedDay = w.days.find(d => d.isSelected);
            if (selectedDay) {
                this._selectedDay = selectedDay;
            }
        });
    }

    public updateDisabledState(config: DatePickerConfig): void {
        if (!config) {
            return;
        }

        const isDisabledByMinDate = config.minDate &&
            (config.minDate.getFullYear() > this._yearNumber ||
                (config.minDate.getFullYear() === this._yearNumber && config.minDate.getMonth() > this._monthNumber));

        const isDisabledByMaxDate = config.maxDate &&
            (config.maxDate.getFullYear() < this._yearNumber ||
                (config.maxDate.getFullYear() === this._yearNumber && config.maxDate.getMonth() < this._monthNumber));

        this._isDisabled = isDisabledByMinDate || isDisabledByMaxDate;

        if (this._weeks) {
            this._weeks.forEach(w => w.updateDisabledState(config));
        }
    }

    public updateHightLighted(config: DatePickerConfig): void {
        if (!config || !config.hightLightedDates) {
            return;
        }

        if (this.weeks) {
            this._weeks.forEach(w => w.updateHightLighted(config));
        }
    }

    private _createWeeks(config: DatePickerConfig): void {
        const newWeeks: Week[] = [];

        let startDate = DateHelper.startOfWeek(new Date(this._yearNumber, this._monthNumber, 1));

        let weekNumber = 1;

        while (weekNumber !== 7) {
            newWeeks.push(new Week(this._yearNumber, this._monthNumber, weekNumber, config));

            startDate = DateHelper.addDays(startDate, 7);
            weekNumber++;
        }

        this._weeks = newWeeks;
    }
}
