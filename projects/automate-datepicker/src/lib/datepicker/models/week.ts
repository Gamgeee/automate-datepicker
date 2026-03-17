import { Day } from './day';
import { DatePickerConfig } from './datepicker-config';
import { DateHelper } from '../../date.helper';

export class Week {
    public get days(): Day[] { return this._days; }


    private _days: Day[];

    private _yearNumber: number;
    private _monthNumber: number;
    private _weekNumber: number;

    constructor(yearNumber: number, monthNumber: number, weekNumber: number, config: DatePickerConfig) {
        this._yearNumber = yearNumber;
        this._monthNumber = monthNumber;
        this._weekNumber = weekNumber;

        this._createDays(config);
        this._updateTodayDay(config);
    }

    public updateSelectedDay(date: Date): void {
        this._days.forEach(d => d.updateIsSelected(date));
    }

    public updateDisabledState(config: DatePickerConfig): void {
        if (!config) {
            return;
        }

        this._days.forEach(d => d.updateDisabledState(config));
    }

    public updateHightLighted(config: DatePickerConfig): void {
        if (!config || !config.hightLightedDates) {
            return;
        }

        this._days.forEach(d => d.updateHightLighted(config));
    }

    private _createDays(config: DatePickerConfig): void {
        let startDate = DateHelper.addDays(DateHelper.startOfWeek(new Date(this._yearNumber, this._monthNumber, 1)), (this._weekNumber - 1) * 7);
        const endDate = DateHelper.endOfWeek(startDate);

        const newDays: Day[] = [];

        while (startDate <= endDate) {
            const newDay = new Day(this._monthNumber, startDate, config);

            newDays.push(newDay);

            startDate = DateHelper.addDays(startDate, 1);
        }

        this._days = newDays;
    }

    private _updateTodayDay(config: DatePickerConfig): void {
        if (config.showTodayDay) {
            this._days.forEach(w => w.updateTodayDay());
        }
    }
}
