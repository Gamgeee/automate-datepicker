import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutomateTimePickerTime } from '../../models/automate-timepicker-time';
import { TimePickerConfig } from '../../models/timepicker-config';
import { Hour } from '../models/hour';

@Component({
  selector: 'automate-timepicker-hours-clock',
  templateUrl: './automate-timepicker-hours-clock.component.html',
  styleUrls: ['../automate-timepicker-clock.component.scss']
})
export class AutomateTimePickerHoursClockComponent implements OnDestroy {
  @Input()
  public set selectedTime(value: AutomateTimePickerTime) {
    this._selectedTime = value;

    this._selectedTimeChanged();
  }
  public get selectedTime(): AutomateTimePickerTime {
    return this._selectedTime;
  }

  @Input()
  public set config(value: TimePickerConfig) {
    this._config = value;

    this._beforeNoonHours.forEach(h => h.setConfig(this._config));
    this._afterNoonHours.forEach(h => h.setConfig(this._config));
  }
  public get config(): TimePickerConfig {
    return this._config;
  }

  @Output()
  public onHourSelected = new EventEmitter<number>();

  public get hours(): Hour[] {
    return this.selectedTime.isAfterNoon ? this._afterNoonHours : this._beforeNoonHours;
  }

  public selectedHour: Hour;

  private _beforeNoonHours: Hour[];
  private _afterNoonHours: Hour[];
  private _selectedTime: AutomateTimePickerTime;
  private _config: TimePickerConfig;

  private _onSelectedTimeHourChanged: Subscription;

  constructor() {
    this._createHours();
  }

  public ngOnDestroy(): void {
    if (this._onSelectedTimeHourChanged) {
      this._onSelectedTimeHourChanged.unsubscribe();
    }
  }

  public selectHour(hour: Hour): void {
    this.onHourSelected.emit(hour.hour);
    this._setSelectedHour();
  }

  private _selectedTimeChanged(): void {
    if (!this.selectedTime) {
      return;
    }

    this._onSelectedTimeHourChanged = this.selectedTime.events.onHourChanged.subscribe(() => this._setSelectedHour());

    this._setSelectedHour();
  }

  private _setSelectedHour(): void {
    this._beforeNoonHours.forEach(h => h.setIsSelected(this.selectedTime));
    this._afterNoonHours.forEach(h => h.setIsSelected(this.selectedTime));

    this.selectedHour = this._beforeNoonHours.find(h => h.isSelected) || this._afterNoonHours.find(h => h.isSelected);
  }

  private _createHours(): void {
    this._beforeNoonHours = new Array(12).fill(1).map((v, i) => new Hour(i));
    this._afterNoonHours = new Array(12).fill(1).map((v, i) => new Hour(i + 12));
  }
}

