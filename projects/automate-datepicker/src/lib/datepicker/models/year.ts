import { Month } from './month';
import { DatePickerConfig } from './datepicker-config';
import { DateHelper } from '../../date.helper';

export class Year {
    public get isDisabled(): boolean { return this._isDisabled; }

    public get isSelected(): boolean { return this._isSelected; }

    public get yearNumber(): number { return this._yearNumber; }

    public get yearLabel(): string { return this._yearLabel; }

    public get yearTitle(): string { return this._yearTitle; }

    public get months(): Month[] { return this._months; }

    private _isDisabled: boolean;
    private _isSelected: boolean;
    private _yearNumber: number;
    private _yearLabel: string;
    private _yearTitle: string;
    private _months: Month[];

    constructor(yearNumber: number, config: DatePickerConfig, createMonths: boolean = true, createWeeks: boolean = true) {
        this._yearNumber = yearNumber;
        this._yearLabel = DateHelper.toFormat(new Date(this._yearNumber, 1, 1), config.yearLabel);
        this._yearTitle = DateHelper.toFormat(new Date(this._yearNumber, 1, 1), config.yearTitle);

        if (createMonths) {
            this._createMonths(config, createWeeks);
        }
    }

    public updateIsSelected(selectedYearNumber: number): void {
        this._isSelected = this._yearNumber === selectedYearNumber;
    }

    public updateSelectedMonth(selectedYearNumber: number, selectedMonthNumber: number): void {
        this.months.forEach(m => m.updateIsSelected(selectedYearNumber, selectedMonthNumber));
    }

    public updateDisabledState(config: DatePickerConfig): void {
        if (!config) {
            return;
        }

        const isDisabledByMinDate = config.minDate && config.minDate.getFullYear() > this._yearNumber;
        const isDisabledByMaxDate = config.maxDate && config.maxDate.getFullYear() < this._yearNumber;

        this._isDisabled = isDisabledByMinDate || isDisabledByMaxDate;

        if (this._months) {
            this._months.forEach(m => m.updateDisabledState(config));
        }
    }

    private _createMonths(config: DatePickerConfig, createWeeks: boolean): void {
        this._months = [];

        for (let index = 0; index <= 11; index++) {
            this.months.push(new Month(this._yearNumber, index, config, createWeeks));
        }
    }
}
