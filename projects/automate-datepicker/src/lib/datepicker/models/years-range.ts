import { Year } from './year';
import { DatePickerConfig } from './datepicker-config';

export class YearsRange {
    public get years(): Year[] { return this._years; }

    public get startYear(): number { return this._startYear; }
    public get endYear(): number { return this._endYear; }

    public get startYearTitle(): string { return this._startYearTitle; }
    public get endYearTitle(): string { return this._endYearTitle; }

    private _years: Year[];

    private _startYear: number;
    private _endYear: number;

    private _startYearTitle: string;
    private _endYearTitle: string;

    constructor(startYear: number, endYear: number, config: DatePickerConfig) {
        this._startYear = startYear;
        this._endYear = endYear;

        this._createYears(config);

        this._startYearTitle = this._years[0].yearTitle;
        this._endYearTitle = this._years[this._years.length - 1].yearTitle;
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

    private _createYears(config: DatePickerConfig): void {
        this._years = [];

        let currentYear = this._startYear;

        while (currentYear <= this._endYear) {
            this.years.push(new Year(currentYear, config, false));

            currentYear++;
        }
    }
}
