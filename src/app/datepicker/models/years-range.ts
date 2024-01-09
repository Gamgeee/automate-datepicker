import { Year } from './year';
import { DatePickerConfig } from './datepicker-config';

export class YearsRange {
    public get years(): Year[] { return this._years; }

    public get startYear(): number { return this._startYear; }
    public get endYear(): number { return this._endYear; }

    private _years: Year[];

    private _startYear: number;
    private _endYear: number;

    constructor(startYear: number, endYear: number) {
        this._startYear = startYear;
        this._endYear = endYear;

        this._createYears();
    }

    public updateSelectedYear(selectedYearNumber: number): void {
        this.years.forEach(y => y.updateIsSelected(selectedYearNumber));
    }

    public updateDisabledState(config: DatePickerConfig): void {
        if (!config) {
            return;
        }

        this._years.forEach(m => m.updateDisabledState(config));
    }

    private _createYears(): void {
        this._years = [];

        let currentYear = this._startYear;

        while (currentYear <= this._endYear) {
            this.years.push(new Year(currentYear, false));

            currentYear++;
        }
    }
}
