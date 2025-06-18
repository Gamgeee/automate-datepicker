import { DatePipe } from '@angular/common';
import { AutomateTimePickerTime } from '../../models/automate-timepicker-time';
import { TimePickerConfig } from '../../models/timepicker-config';
import { ClockItem } from './clock-item.base';

export class Minutes extends ClockItem {
  public static MINUTES_INTERVAL = 1;
  public static MINUTES_DISPLAY_INTERVAL = 5;

  public get formattedMinutes(): string { return this._formattedMinutes; }
  public get minutes(): number { return this._minutes; }
  public get isSelected(): boolean { return this._isSelected; }

  public get showMinutes(): boolean { return this._minutes % Minutes.MINUTES_DISPLAY_INTERVAL === 0; }

  private _formattedMinutes: string;
  private _minutes: number;
  private _isSelected: boolean;

  private readonly _degreeInterval = 6;

  private _config: TimePickerConfig;

  constructor(minutes: number) {
    super();

    this._minutes = minutes;

    this._setPositions(this._calculateDegree(), this.showMinutes ? null : 0.35);
  }

  public setConfig(config: TimePickerConfig): void {
    this._config = config;

    this._setFormattedMinutes();
  }

  public setIsSelected(selectedTime: AutomateTimePickerTime): void {
    this._isSelected = this._minutes === selectedTime.minutes;
  }

  private _calculateDegree(): number {
    const minutesIndex = this._minutes;

    return this._degreeStart + minutesIndex * this._degreeInterval;
  }

  private _setFormattedMinutes(): void {
    if (!this._config) {
      throw new Error('Config should be provided.');
    }

    const dateTimePipe = new DatePipe(this._config.locale);

    const dateTime = new Date();
    dateTime.setMinutes(this._minutes);

    this._formattedMinutes = dateTimePipe.transform(dateTime, this._config.minutesFormat);
  }
}
