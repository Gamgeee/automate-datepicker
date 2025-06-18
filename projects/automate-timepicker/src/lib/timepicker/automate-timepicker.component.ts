import {
  Component, forwardRef, Input, Output, EventEmitter, ViewChild, OnDestroy, ContentChild, TemplateRef, ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AutomateDropdownComponent } from 'projects/automate-shared/automate-dropdown/automate-dropdown.component';
import { AppendToTemplateContext } from '../directives/append-to-template-context';
import { AppendToTemplateDirective } from '../directives/append-to-template.directive';
import { AutomateTimePickerTime } from './models/automate-timepicker-time';
import { TimePickerConfig } from './models/timepicker-config';

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutomateTimePickerComponent),
  multi: true
};

@Component({
  selector: 'automate-timepicker',
  templateUrl: './automate-timepicker.component.html',
  styleUrls: ['./automate-timepicker.component.scss', './theme/default.scss',
    './theme/dark.scss', './theme/christmas.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class AutomateTimePickerComponent implements OnDestroy, ControlValueAccessor {
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
  public set config(value: TimePickerConfig) {
    this._config = value;

    this._configOrDefault = TimePickerConfig.createDefaultOrUseExisting(this._config);

    this.time.setConfig(this._configOrDefault);
  }
  public get config(): TimePickerConfig {
    return this._config;
  }

  @Output()
  public open = new EventEmitter();
  @Output()
  public close = new EventEmitter();

  @ViewChild('dropdown')
  public dropdown: AutomateDropdownComponent;

  @ViewChild('defaultAppendToTemplate', { read: TemplateRef })
  public defaultAppendToTemplate: TemplateRef<AppendToTemplateContext>;

  @ContentChild(AppendToTemplateDirective)
  public appendToTemplate: AppendToTemplateDirective;

  public time: AutomateTimePickerTime;

  public formattedTime: string;

  private _config: TimePickerConfig;
  private _configOrDefault: TimePickerConfig;

  constructor() {
    this._configOrDefault = TimePickerConfig.createDefaultOrUseExisting();

    this.time = new AutomateTimePickerTime(this._configOrDefault.defaultTime);
    this.time.setConfig(this._configOrDefault);
  }

  public ngOnDestroy(): void {
  }

  public writeValue(value: Date): void {
    if (value !== this.time.dateTime) {
      this.time.setTime(value || this._configOrDefault.defaultTime);
      this._updatedFormattedTime();
    }
  }

  public onChange = (_) => { };
  public onTouched = () => { };

  public registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
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
    this._updatedFormattedTime();

    this.onChange(new Date(time.dateTime));

    if (this._configOrDefault.closeAfterSelect) {
      this.dropdown.hide();
    }
  }

  private _updatedFormattedTime(): void {
    this.formattedTime = this.time.formattedTime;
  }
}
