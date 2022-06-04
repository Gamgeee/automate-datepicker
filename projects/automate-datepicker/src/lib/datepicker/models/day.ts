import { DatePickerConfig } from './datepicker-config';
import { DateHelper } from '../../date.helper';

export class Day {
    public get isDisabled(): boolean { return this._isDisabled; }

    public get isSelected(): boolean { return this._isSelected; }

    public get isToday(): boolean { return this._isToday; }

    public get dayNumber(): number { return this._dayNumber; }

    public get dayLabel(): string { return this._dayLabel; }

    public get dayDate(): Date { return this._dayDate; }

    public get hightLightedStyle(): Partial<CSSStyleDeclaration> { return this._hightLightedStyle; }


    private _isDisabled: boolean;
    private _isSelected: boolean;
    private _isToday: boolean;
    private _dayNumber: number;
    private _dayLabel: string;
    private _dayDate: Date;
    private _hightLightedStyle: Partial<CSSStyleDeclaration>;

    private _displayedAtMonthNumber: number;

    constructor(displayedAtMonthNumber: number, dayDate: Date, config: DatePickerConfig) {
        this._displayedAtMonthNumber = displayedAtMonthNumber;
        this._dayNumber = dayDate.getDate();
        this._dayLabel = DateHelper.toFormat(dayDate, config.dayLabel);
        this._dayDate = dayDate;

        this._setDisabled(false);
    }

    public updateIsSelected(selectedDate: Date): void {
        this._isSelected = selectedDate && selectedDate.toDateString() === this.dayDate.toDateString();
    }

    public updateTodayDay(): void {
        this._isToday = this.dayDate.toDateString() === new Date().toDateString();
    }

    public updateDisabledState(config: DatePickerConfig): void {
        if (!config) {
            return;
        }

        const isDisabledByMinDate = config.minDate &&
            DateHelper.startOfDay(config.minDate) > DateHelper.startOfDay(this._dayDate);

        const isDisabledByMaxDate = config.maxDate &&
            DateHelper.startOfDay(config.maxDate) < DateHelper.startOfDay(this._dayDate);

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
