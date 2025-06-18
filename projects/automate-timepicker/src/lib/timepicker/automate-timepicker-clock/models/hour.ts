import { DatePipe } from '@angular/common';
import { AutomateTimePickerTime } from '../../models/automate-timepicker-time';
import { TimePickerConfig } from '../../models/timepicker-config';
import { ClockItem } from './clock-item.base';

export class Hour extends ClockItem {
  public get formattedHour(): string { return this._formattedHour; }
  public get hour(): number { return this._hour; }
  public get isSelected(): boolean { return this._isSelected; }

  private _formattedHour: string;
  private _hour: number;
  private _isSelected: boolean;

  private readonly _degreeInterval = 30;

  private _config: TimePickerConfig;

  constructor(hour: number) {
    super();

    this._hour = hour;

    this._setPositions(this._calculateDegree());
  }

  public setConfig(config: TimePickerConfig): void {
    this._config = config;

    this._setFormattedHour();
  }

  public setIsSelected(selectedTime: AutomateTimePickerTime): void {
    this._isSelected = this._hour === selectedTime.hour;
  }

  private _calculateDegree(): number {
    const hourIndex = this._hour > 11 ? this._hour - 12 : this._hour;

    return this._degreeStart + hourIndex * this._degreeInterval;
  }

  private _setFormattedHour(): void {
    if (!this._config) {
      throw new Error('Config should be provided.');
    }

    const dateTimePipe = new DatePipe(this._config.locale);

    const dateTime = new Date();
    dateTime.setHours(this._hour);

    this._formattedHour = dateTimePipe.transform(dateTime, this._config.hoursFormat);
  }
}
