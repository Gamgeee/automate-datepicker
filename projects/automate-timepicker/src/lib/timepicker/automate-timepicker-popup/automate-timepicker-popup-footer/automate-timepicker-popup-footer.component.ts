import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AutomateTimePickerTime } from '../../models/automate-timepicker-time';
import { TimePickerConfig } from '../../models/timepicker-config';

@Component({
  selector: 'automate-timepicker-popup-footer',
  templateUrl: './automate-timepicker-popup-footer.component.html',
  styleUrls: ['./automate-timepicker-popup-footer.component.scss']
})
export class AutomateTimePickerPopupFooterComponent {
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
  public onSaveClick = new EventEmitter();
  @Output()
  public onCancelClick = new EventEmitter();

  private _selectedTime: AutomateTimePickerTime;

  constructor() { }

  public saveClick(): void {
    this.onSaveClick.emit();
  }

  public cancelClick(): void {
    this.onCancelClick.emit();
  }
}
