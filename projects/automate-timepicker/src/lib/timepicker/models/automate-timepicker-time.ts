import { Subject } from 'rxjs';
import { TimePickerConfig } from './timepicker-config';
import { getDatePipe } from '../utils/date-pipe-cache';

export class AutomateTimePickerTime {
  public get formattedTime(): string {
    return this._originalDateTime === null ? '' : this._formattedTime;
  }

  public get formattedHours(): string { return this._formattedHours; }
  public get timeSeparator(): string { return this._timeSeparator; }
  public get formattedMinutes(): string { return this._formattedMinutes; }

  public get dateTime(): Date { return this._dateTime; }

  public get hour(): number { return this._hour; }
  public get minutes(): number { return this._minutes; }

  public get isBeforeNoon(): boolean { return this.hour <= 11; }
  public get isAfterNoon(): boolean { return !this.isBeforeNoon; }

  public get events(): Events { return this._events; }

  public get isNull(): boolean { return this._originalDateTime === null; }

  private _formattedTime: string;

  private _formattedHours: string;
  private _formattedMinutes: string;

  private _hour: number;
  private _minutes: number;

  private _dateTime: Date;
  private _originalDateTime: Date | null;

  private _timeSeparator: string = ':';

  private _config: TimePickerConfig;
  private _events: Events;

  constructor(time?: Date) {
    this._events = new Events();

    const timeToSet = time || new Date();

    this.setTime(timeToSet);
  }

  public setConfig(config: TimePickerConfig): void {
    this._config = config;

    this._clampToMinMax();
    this._updateFormattedTime();

    this._events.onHourChanged.next(this._hour);
    this._events.onMinutesChanged.next(this._minutes);
  }

  public setTime(dateTime: Date | null): void {
    this._dateTime = dateTime ? new Date(dateTime) : this._getDefaultTime();
    this._originalDateTime = dateTime;

    this._hour = this._dateTime.getHours();
    this._minutes = this._dateTime.getMinutes();

    this._clampToMinMax();
    this._updateFormattedTime();

    this._events.onHourChanged.next(this._hour);
    this._events.onMinutesChanged.next(this._minutes);
  }

  public setDisplayTimeToCurrentClamped(): void {
    this._dateTime = new Date();
    this._hour = this._dateTime.getHours();
    this._minutes = this._dateTime.getMinutes();
    this._clampToMinMax();
    this._updateFormattedTime();
  }

  public setDisplayTimeToDefaultClamped(): void {
    this._dateTime = this._getDefaultTime();

    this.setHour(this._dateTime.getHours());
    this.setMinutes(this._dateTime.getMinutes());
  }

  public setHour(hour: number): void {
    this._hour = hour;

    this._dateTime.setHours(this._hour);

    this._clampToMinMax();
    this._updateFormattedTime();

    this.events.onHourChanged.next(this._hour);
  }

  public setMinutes(minutes: number): void {
    this._minutes = minutes;

    this._dateTime.setMinutes(this._minutes);

    this._clampToMinMax();
    this._updateFormattedTime();

    this._events.onMinutesChanged.next(this._minutes);
  }

  public switchToBeforeNoon(): void {
    if (this.isBeforeNoon) {
      return;
    }

    this.setHour(this.hour - 12);
  }

  public switchToAfterNoon(): void {
    if (this.isAfterNoon) {
      return;
    }

    this.setHour(this.hour + 12);
  }

  public resetToOriginalDateTime(): void {
    if (this._originalDateTime === null) {
      this.setDisplayTimeToDefaultClamped();
      return;
    }
    this.setTime(this._originalDateTime);
  }

  private _getDefaultTime(): Date {
    if (this._config?.defaultTime) {
      return new Date(this._config.defaultTime);
    }
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  }

  private _clampToMinMax(): void {
    if (!this._config) {
      return;
    }

    const currentMins = this._hour * 60 + this._minutes;
    let minMins = 0;
    if (this._config.minTime != null) {
      minMins = this._config.minTime.hour * 60 + this._config.minTime.minutes;
    }
    let maxMins = 24 * 60 - 1;
    if (this._config.maxTime != null) {
      maxMins = this._config.maxTime.hour * 60 + this._config.maxTime.minutes;
    }
    const clamped = Math.max(minMins, Math.min(maxMins, currentMins));
    this._hour = Math.floor(clamped / 60);
    this._minutes = clamped % 60;
    this._dateTime.setHours(this._hour);
    this._dateTime.setMinutes(this._minutes);
  }

  private _updateFormattedTime(): void {
    if (!this._config) {
      return;
    }

    const dateTimePipe = getDatePipe(this._config.locale ?? 'en-US');

    this._formattedHours = dateTimePipe.transform(this._dateTime, this._config.headerHoursFormat) ?? '';
    this._formattedMinutes = dateTimePipe.transform(this._dateTime, this._config.headerMinutesFormat) ?? '';

    this._formattedTime = dateTimePipe.transform(this._dateTime, this._config.timeFormat) ?? '';
  }
}

export class Events {
  public onHourChanged = new Subject<number>();
  public onMinutesChanged = new Subject<number>();
}