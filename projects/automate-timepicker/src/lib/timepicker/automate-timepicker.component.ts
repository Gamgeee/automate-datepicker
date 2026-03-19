import {
  Component, forwardRef, Input, Output, EventEmitter, ViewChild, OnDestroy,
  ContentChild, TemplateRef, ViewEncapsulation, ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AppendToTemplateContext } from '../directives/append-to-template-context';
import { AppendToTemplateDirective } from '../directives/append-to-template.directive';
import { AutomateTimePickerTime } from './models/automate-timepicker-time';
import { TimePickerConfig } from './models/timepicker-config';
import { AutomateTimePickerPopupComponent } from './automate-timepicker-popup/automate-timepicker-popup.component';
import { AutomateDropdownComponent } from './automate-dropdown/automate-dropdown.component';
import { TimeChangedEvent } from './models/time-changed-event';

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutomateTimePickerComponent),
  multi: true
};

@Component({
  selector: 'automate-timepicker',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AutomateDropdownComponent,
    AutomateTimePickerPopupComponent,
  ],
  templateUrl: './automate-timepicker.component.html',
  styleUrls: [
    './automate-timepicker.component.scss',
    './theme/default.scss',
    './theme/dark.scss'
  ],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class AutomateTimePickerComponent implements OnDestroy, ControlValueAccessor {
  @Input()
  public disabled: boolean = false;

  @Input()
  public id: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public theme: 'default' | 'dark' = 'default';

  @Input()
  public set config(value: TimePickerConfig) {
    this._config = value;

    this._configOrDefault = TimePickerConfig.createDefaultOrUseExisting(this._config);

    this.time.setConfig(this._configOrDefault);

    if (!this._hasReceivedValueFromNgModel && this._config.defaultTime) {
      this.time.setTime(null);
      this._updatedFormattedTime();
    }

    this._subscribeOnConfigUpdated();
  }
  public get config(): TimePickerConfig {
    return this._config;
  }

  public get configOrDefault(): TimePickerConfig {
    return this._configOrDefault;
  }

  @Output()
  public onOpen = new EventEmitter<void>();
  @Output()
  public onClose = new EventEmitter<void>();
  @Output()
  public onTimeChanged = new EventEmitter<TimeChangedEvent>();

  @ViewChild('dropdown')
  public dropdown!: AutomateDropdownComponent;

  @ViewChild('automateTimepickerPopup')
  public automateTimepickerPopup!: AutomateTimePickerPopupComponent;

  @ViewChild('defaultAppendToTemplate', { read: TemplateRef })
  public defaultAppendToTemplate!: TemplateRef<AppendToTemplateContext>;

  @ContentChild(AppendToTemplateDirective)
  public appendToTemplate: AppendToTemplateDirective | null = null;

  public time: AutomateTimePickerTime;

  public formattedTime: string = '';

  private _config!: TimePickerConfig;
  private _configOrDefault: TimePickerConfig;
  private _configUpdatedSub?: Subscription;
  private _hasReceivedValueFromNgModel = false;

  constructor(private readonly _cdr: ChangeDetectorRef) {
    this._configOrDefault = TimePickerConfig.createDefaultOrUseExisting();

    this.time = new AutomateTimePickerTime(this._configOrDefault.defaultTime);
    this.time.setConfig(this._configOrDefault);
  }

  public ngOnDestroy(): void {
    if (this._configUpdatedSub) {
      this._configUpdatedSub.unsubscribe();
    }
  }

  public writeValue(value: Date | null): void {
    this._hasReceivedValueFromNgModel = true;
    this.time.setTime(value);
    this._updatedFormattedTime();
  }

  public onChange = (_: Date) => { };
  public onTouched = () => { };

  public registerOnChange(fn: (_: Date) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public popupOpened(): void {
    if (this.time.isNull) {
      this.time.setDisplayTimeToDefaultClamped();
    }

    this.onOpen.emit();
  }

  public popupClosed(): void {
    this.automateTimepickerPopup.resetClockMode();
    this.time.resetToOriginalDateTime();

    this.onClose.emit();
  }

  public save(): void {
    this.selectTime(this.time);

    if (!this._configOrDefault.closeAfterSelect) {
      this.dropdown.hide();
    }
  }

  public cancel(): void {
    this.dropdown.hide();
  }

  public selectTime(time: AutomateTimePickerTime): void {
    this.time.setTime(time.dateTime);

    this._updatedFormattedTime();

    this.onChange(new Date(time.dateTime));

    this.onTimeChanged.emit({
      hour: this.time.hour,
      minutes: this.time.minutes,
      formattedTime: this.time.formattedTime,
      dateTime: this.time.dateTime
    });

    if (this._configOrDefault.closeAfterSelect) {
      this.dropdown.hide();
    }
  }

  private _updatedFormattedTime(): void {
    this.formattedTime = this.time.formattedTime;
  }

  private _subscribeOnConfigUpdated(): void {
    if (this._configUpdatedSub) {
      this._configUpdatedSub.unsubscribe();
    }

    if (this._config?.onUpdated) {
      this._configUpdatedSub = this._config.onUpdated.subscribe(() => {
        this._configOrDefault = TimePickerConfig.createDefaultOrUseExisting(this._config);
        this.time.setConfig(this._configOrDefault);
        this._cdr.detectChanges();
      });
    }
  }
}
