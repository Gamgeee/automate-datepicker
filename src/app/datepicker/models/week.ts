import { Day } from './day';
import { DatePickerConfig } from './datepicker-config';

export class Week {
    public get days(): Day[] {
        return this._days;
    }

    private _yearNumber: number;
    private _monthNumber: number;
    private _weekNumber: number;

    private _days: Day[];

    constructor(yearNumber: number, monthNumber: number, weekNumber: number) {
        this._yearNumber = yearNumber;
        this._monthNumber = monthNumber;
        this._weekNumber = weekNumber;

        this._createDays();
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

    private _createDays(): void {
        let startDate = new Date(this._yearNumber, this._monthNumber, 1).startOfWeek().addDays((this._weekNumber - 1) * 7);
        const endDate = startDate.endOfWeek();

        const newDays: Day[] = [];

        while (startDate <= endDate) {
            const newDay = new Day(this._monthNumber, startDate);

            newDays.push(newDay);

            startDate = startDate.addDays(1);
        }

        this._days = newDays;
    }
}
