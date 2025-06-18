import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EClockMode } from '../enums/e-clock-mode';
import { AutomateTimePickerTime } from '../models/automate-timepicker-time';
import { TimePickerConfig } from '../models/timepicker-config';

@Component({
    selector: 'automate-timepicker-clock',
    templateUrl: './automate-timepicker-clock.component.html',
    styleUrls: ['./automate-timepicker-clock.component.scss']
})
export class AutomateTimePickerClockComponent {
    @Input()
    public theme: 'default' | 'dark' | 'default christmas' | 'dark christmas' = 'default';

    @Input()
    public set selectedTime(value: AutomateTimePickerTime) {
        this._selectedTime = value;
    }
    public get selectedTime(): AutomateTimePickerTime {
        return this._selectedTime;
    }

    @Input()
    public set config(value: TimePickerConfig) {
        this._config = TimePickerConfig.createDefaultOrUseExisting(value);
    }
    public get config(): TimePickerConfig {
        return this._config;
    }

    @Output()
    public onTimeSelected = new EventEmitter<AutomateTimePickerTime>();

    public readonly EClockMode = EClockMode;

    public clockMode: EClockMode = EClockMode.Hours;

    private _selectedTime: AutomateTimePickerTime;
    private _config: TimePickerConfig = TimePickerConfig.createDefaultOrUseExisting();

    private _animationDelayMs = 250;

    constructor() { }

    public selectHour(hour: number): void {
        this._selectedTime.setHour(hour);

        setTimeout(() => {
            this._showMinutesClock();
        }, this._animationDelayMs);
    }

    public selectMinutes(minutes: number): void {
        this._selectedTime.setMinutes(minutes);

        this.onTimeSelected.emit(this._selectedTime);
    }

    public switchToHoursClock(): void {
        if (this.clockMode === EClockMode.Hours) {
            return;
        }

        this._showHourClock();
    }

    public switchToMinutesClock(): void {
        if (this.clockMode === EClockMode.Minutes) {
            return;
        }

        this._showMinutesClock();
    }

    public switchMeridiem(data: { isAfterNoon: boolean }): void {
        if (data.isAfterNoon) {
            this.selectedTime.switchToAfterNoon();
        } else {
            this.selectedTime.switchToBeforeNoon();
        }
        console.log(this.selectedTime.dateTime);
    }

    private _showHourClock(): void {
        this.clockMode = EClockMode.Hours;
    }

    private _showMinutesClock(): void {
        this.clockMode = EClockMode.Minutes;
    }
}
