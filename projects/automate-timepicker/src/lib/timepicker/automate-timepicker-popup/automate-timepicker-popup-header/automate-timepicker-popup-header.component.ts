import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AutomateTimePickerTime } from '../../models/automate-timepicker-time';
import { TimePickerConfig } from '../../models/timepicker-config';

@Component({
  selector: 'automate-timepicker-popup-header',
  templateUrl: './automate-timepicker-popup-header.component.html',
  styleUrls: ['./automate-timepicker-popup-header.component.scss']
})
export class AutomateTimePickerPopupHeaderComponent {
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
  public onHoursClick = new EventEmitter();
  @Output()
  public onMinutesClick = new EventEmitter();
  @Output()
  public onMeridiemClick = new EventEmitter<{ isAfterNoon: boolean }>();

  private _selectedTime: AutomateTimePickerTime;

  constructor() { }

  public hoursClick(): void {
    this.onHoursClick.emit();
  }

  public minutesClick(): void {
    this.onMinutesClick.emit();
  }

  public meridiemClick(isAfterNoon: boolean): void {
    this.onMeridiemClick.emit({ isAfterNoon: isAfterNoon });
  }
}
