import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { AutomateTimePickerClockComponent } from '../automate-timepicker-clock/automate-timepicker-clock.component';
import { AutomateTimePickerTime } from '../models/automate-timepicker-time';
import { TimePickerConfig } from '../models/timepicker-config';

@Component({
  selector: 'automate-timepicker-popup',
  templateUrl: './automate-timepicker-popup.component.html',
  styleUrls: ['./automate-timepicker-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutomateTimePickerPopupComponent {
  @Input()
  public disabled: boolean;

  @Input()
  public id: string;

  @Input()
  public placeholder = '';

  @Input()
  public container: '' | 'body' = '';

  @Input()
  public placement: 'left' | 'right' = 'left';

  @Input()
  public theme: 'default' | 'dark' | 'default christmas' | 'dark christmas' = 'default';

  @Input()
  public config: TimePickerConfig;

  @Input()
  public selectedTime: AutomateTimePickerTime;

  @Output()
  public onSaveClick = new EventEmitter();
  @Output()
  public onCancelClick = new EventEmitter();

  @Output()
  public onTimeSelected = new EventEmitter<AutomateTimePickerTime>();

  @ViewChild('clock')
  public clockComponent: AutomateTimePickerClockComponent;

  constructor() {
  }
}
