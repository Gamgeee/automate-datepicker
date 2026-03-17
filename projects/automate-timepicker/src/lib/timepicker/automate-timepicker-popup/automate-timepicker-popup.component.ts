import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomateTimePickerClockComponent } from '../automate-timepicker-clock/automate-timepicker-clock.component';
import { AutomateTimePickerPopupHeaderComponent } from './automate-timepicker-popup-header/automate-timepicker-popup-header.component';
import { AutomateTimePickerPopupFooterComponent } from './automate-timepicker-popup-footer/automate-timepicker-popup-footer.component';
import { AutomateTimePickerTime } from '../models/automate-timepicker-time';
import { TimePickerConfig } from '../models/timepicker-config';
import { EClockMode } from '../enums/e-clock-mode';

@Component({
  selector: 'automate-timepicker-popup',
  standalone: true,
  imports: [
    CommonModule,
    AutomateTimePickerPopupHeaderComponent,
    AutomateTimePickerClockComponent,
    AutomateTimePickerPopupFooterComponent,
  ],
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
  public theme: 'default' | 'dark' = 'default';

  @Input()
  public config: TimePickerConfig;

  @Input()
  public selectedTime: AutomateTimePickerTime;

  @Output()
  public onSaveClick = new EventEmitter<void>();
  @Output()
  public onCancelClick = new EventEmitter<void>();

  @ViewChild('clock')
  public clockComponent: AutomateTimePickerClockComponent;

  public get clockMode(): EClockMode {
    return this.clockComponent?.clockMode || EClockMode.Hours;
  }

  constructor() {
  }

  public resetClockMode(): void {
    this.clockComponent.resetClockMode();
  }
}
