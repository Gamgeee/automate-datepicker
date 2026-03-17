import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EClockMode } from '../enums/e-clock-mode';
import { AutomateTimePickerTime } from '../models/automate-timepicker-time';
import { TimePickerConfig } from '../models/timepicker-config';
import { AutomateTimePickerHoursClockComponent } from './automate-timepicker-hours-clock/automate-timepicker-hours-clock.component';
import { AutomateTimePickerMinutesClockComponent } from './automate-timepicker-minutes-clock/automate-timepicker-minutes-clock.component';

@Component({
    selector: 'automate-timepicker-clock',
    standalone: true,
    imports: [CommonModule, AutomateTimePickerHoursClockComponent, AutomateTimePickerMinutesClockComponent],
    templateUrl: './automate-timepicker-clock.component.html',
    styleUrls: ['./automate-timepicker-clock.component.scss']
})
export class AutomateTimePickerClockComponent {
    @Input()
    public theme: 'default' | 'dark' = 'default';

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
    public onSaveTime = new EventEmitter<void>();

    public readonly EClockMode = EClockMode;

    public clockMode: EClockMode = EClockMode.Hours;

    /** When true, clock container is scaled down for view-change animation. */
    public isViewChanging = false;

    private _selectedTime!: AutomateTimePickerTime;
    private _config: TimePickerConfig = TimePickerConfig.createDefaultOrUseExisting();

    private _viewChangeScaleDurationMs = 220;

    constructor(private _cdr: ChangeDetectorRef) { }

    public resetClockMode(): void {
        this.switchToHoursClock();
    }

    public selectHour(hour: number): void {
        this._selectedTime.setHour(hour);

        this._showMinutesClock();
    }

    public selectHourDuringDrag(hour: number): void {
        this._selectedTime.setHour(hour);
    }

    public selectMinutes(minutes: number): void {
        this._selectedTime.setMinutes(minutes);

        if (this.config.closeAfterSelect) {
            this.onSaveTime.emit();
        }
    }

    public selectMinutesDuringDrag(minutes: number): void {
        this._selectedTime.setMinutes(minutes);
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
    }

    private _showHourClock(): void {
        this._runViewChangeAnimation(() => {
            this.clockMode = EClockMode.Hours;
            this._cdr.markForCheck();
        });
    }

    private _showMinutesClock(): void {
        this._runViewChangeAnimation(() => {
            this.clockMode = EClockMode.Minutes;
            this._cdr.markForCheck();
        });
    }

    private _runViewChangeAnimation(applyNewView: () => void): void {
        this.isViewChanging = true;
        this._cdr.markForCheck();

        setTimeout(() => {
            applyNewView();
            this.isViewChanging = false;
            this._cdr.markForCheck();
        }, this._viewChangeScaleDurationMs);
    }
}
