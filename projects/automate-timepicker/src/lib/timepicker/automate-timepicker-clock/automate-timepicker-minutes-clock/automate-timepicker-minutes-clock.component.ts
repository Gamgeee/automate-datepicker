import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AutomateTimePickerTime } from '../../models/automate-timepicker-time';
import { TimePickerConfig } from '../../models/timepicker-config';
import { Minutes } from '../models/minutes';

@Component({
  selector: 'automate-timepicker-minutes-clock',
  templateUrl: './automate-timepicker-minutes-clock.component.html',
  styleUrls: ['../automate-timepicker-clock.component.scss']
})
export class AutomateTimePickerMinutesClockComponent {
  @Input()
  public set selectedTime(value: AutomateTimePickerTime) {
    this._selectedTime = value;

    this._setSelectedMinutes();
  }
  public get selectedTime(): AutomateTimePickerTime {
    return this._selectedTime;
  }

  @Input()
  public set config(value: TimePickerConfig) {
    this._config = value;

    this.minutes.forEach(h => h.setConfig(this._config));
  }
  public get config(): TimePickerConfig {
    return this._config;
  }

  @Output()
  public onMinutesSelected = new EventEmitter<number>();

  public minutes: Minutes[];
  public selectedMinutes: Minutes;

  private _selectedTime: AutomateTimePickerTime;
  private _config: TimePickerConfig;

  constructor() {
    this._createMinutes();
  }

  public selectMinutes(minutes: Minutes): void {
    this.onMinutesSelected.emit(minutes.minutes);
    this._setSelectedMinutes();
  }

  private _setSelectedMinutes(): void {
    if (!this.selectedTime) {
      return;
    }

    this.minutes.forEach(m => m.setIsSelected(this.selectedTime));

    this.selectedMinutes = this.minutes.find(m => m.isSelected);
  }

  private _createMinutes(): void {
    this.minutes = new Array(60).fill(1).map((v, i) => new Minutes(i));
  }
}
