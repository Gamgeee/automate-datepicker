import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomateTimePickerTime } from '../../models/automate-timepicker-time';
import { TimePickerConfig } from '../../models/timepicker-config';
import { EClockMode } from '../../enums/e-clock-mode';

@Component({
  selector: 'automate-timepicker-popup-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './automate-timepicker-popup-header.component.html',
  styleUrls: ['./automate-timepicker-popup-header.component.scss']
})
export class AutomateTimePickerPopupHeaderComponent {
  @Input()
  public clockMode: EClockMode;

  @Input()
  public set selectedTime(value: AutomateTimePickerTime) {
    this._selectedTime = value;
  }
  public get selectedTime(): AutomateTimePickerTime {
    return this._selectedTime;
  }

  @Input()
  public config: TimePickerConfig;

  @Output()
  public onHoursClick = new EventEmitter<void>();
  @Output()
  public onMinutesClick = new EventEmitter<void>();
  @Output()
  public onMeridiemClick = new EventEmitter<{ isAfterNoon: boolean }>();

  public readonly EClockMode = EClockMode;

  private _selectedTime: AutomateTimePickerTime;

  /** True when minTime is noon or later, so AM (0–11) is out of range. */
  public get isAmDisabled(): boolean {
    const min = this.config?.minTime;
    return min != null && min.hour >= 12;
  }

  /** True when maxTime is before noon, so PM (12–23) is out of range. */
  public get isPmDisabled(): boolean {
    const max = this.config?.maxTime;
    return max != null && max.hour < 12;
  }

  constructor() { }

  public hoursClick(): void {
    this.onHoursClick.emit();
  }

  public minutesClick(): void {
    this.onMinutesClick.emit();
  }

  public meridiemClick(isAfterNoon: boolean): void {
    if (isAfterNoon && this.isPmDisabled) return;
    if (!isAfterNoon && this.isAmDisabled) return;
    this.onMeridiemClick.emit({ isAfterNoon });
  }
}
