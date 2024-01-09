import { DatePickerConfig } from './datepicker-config';

export class Day {
    public get dayNumber(): number { return this._dayNumber; }

    public get dayDate(): Date { return this._dayDate; }

    public get isSelected(): boolean { return this._isSelected; }

    public get isDisabled(): boolean { return this._isDisabled; }

    public get hightLightedStyle(): Partial<CSSStyleDeclaration> { return this._hightLightedStyle; }

    private _isDisabled: boolean;
    private _hightLightedStyle: Partial<CSSStyleDeclaration>;
    private _isSelected: boolean;

    private _displayedAtMonthNumber: number;
    private _dayNumber: number;
    private _dayDate: Date;

    constructor(displayedAtMonthNumber: number, dayDate: Date) {
        this._displayedAtMonthNumber = displayedAtMonthNumber;
        this._dayNumber = dayDate.getDate();
        this._dayDate = dayDate;

        this._setDisabled(false);
    }

    public updateIsSelected(selectedDate: Date): void {
        this._isSelected = selectedDate && selectedDate.toDateString() === this.dayDate.toDateString();
    }

    public updateDisabledState(config: DatePickerConfig): void {
        if (!config) {
            return;
        }

        const isDisabledByMinDate = config.minDate &&
            config.minDate.startOfDay() > this._dayDate.startOfDay();

        const isDisabledByMaxDate = config.maxDate &&
            config.maxDate.startOfDay() < this._dayDate.startOfDay();

        const isDisabledBySpecificDate = config.disabledDates &&
            config.disabledDates.some(d => d.toDateString() === this._dayDate.toDateString());

        const isDisabledByDayOfWeek = config.disabledDaysOfWeek &&
            config.disabledDaysOfWeek.includes(this._dayDate.getDay());

        this._setDisabled(isDisabledByMinDate || isDisabledByMaxDate || isDisabledBySpecificDate || isDisabledByDayOfWeek);
    }

    public updateHightLighted(config: DatePickerConfig): void {
        if (!config || !config.hightLightedDates) {
            return;
        }

        const hightLightedStyle = config.hightLightedDates.find(d => d.date.toDateString() === this.dayDate.toDateString());
        if (hightLightedStyle) {
            this._hightLightedStyle = hightLightedStyle.style;
        } else {
            this._hightLightedStyle = null;
        }
    }

    private _setDisabled(value: boolean): void {
        this._isDisabled = this._dayDate.getMonth() !== this._displayedAtMonthNumber || value;
    }
}
