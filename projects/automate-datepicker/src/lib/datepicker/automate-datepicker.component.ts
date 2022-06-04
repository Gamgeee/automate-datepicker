import {
  Component, forwardRef, Input, Output, EventEmitter, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef,
  ComponentRef, ViewChild, ElementRef, OnDestroy, HostListener, ContentChild, TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AutomateDatePickerDropdownComponent } from './automate-datepicker-dropdown/automate-datepicker-dropdown.component';
import { Day } from './models/day';
import { DatePickerConfig } from './models/datepicker-config';
import { AppendToTemplateDirective } from '../directives/append-to-template.directive';
import { AppendToTemplateContext } from '../directives/append-to-template-context';
import { DateHelper } from '../date.helper';

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutomateDatePickerComponent),
  multi: true
};

@Component({
  selector: 'automate-datepicker',
  templateUrl: './automate-datepicker.component.html',
  styleUrls: ['./automate-datepicker.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AutomateDatePickerComponent implements OnDestroy, ControlValueAccessor {
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
  public set config(value: DatePickerConfig) {
    this._config = value;

    this._updateFormattedDate();
  }
  public get config(): DatePickerConfig {
    return this._config;
  }

  @Output()
  public onShown = new EventEmitter();
  @Output()
  public onClose = new EventEmitter();

  @ViewChild('appendToTmpWrapper')
  public appendToTemplateWrapper: ElementRef;

  @ViewChild('defaultAppendToTemplate', { read: TemplateRef })
  public defaultAppendToTemplate: TemplateRef<AppendToTemplateContext>;

  @ContentChild(AppendToTemplateDirective)
  public appendToTemplate: AppendToTemplateDirective;



  // get value for component from private variable
  public get model(): Date { return this._model; }
  // set the value (emit) to the parent model
  public set model(v: Date) {
    if (v !== this._model ||
      (!this._model || !v || (this.model && v && this.model.toDateString() !== v.toDateString()))) {
      this._model = v;
      this.onChange(v);
      this._updateFormattedDate();
    }
  }

  public formattedDate: string;
  public isOpen: boolean;

  private get _configOrDefault(): DatePickerConfig {
    return DatePickerConfig.createDefaultOrUseExisting(this._config);
  }

  private _model: Date;
  private _config: DatePickerConfig;

  private _dropdownComponentRef: ComponentRef<AutomateDatePickerDropdownComponent>;

  private _preventCloseOutside: boolean;

  constructor(
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    private readonly _appRef: ApplicationRef,
    private readonly _injector: Injector
  ) {
  }

  public ngOnDestroy(): void {
    this._destroyDropdown();
  }

  // write the value to the input
  public writeValue(value: Date) {
    if (value !== this._model) {
      this._model = value;
      this._updateFormattedDate();
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



  public daySelected(day: Day): void {
    const date = this.model || new Date();
    date.setFullYear(day.dayDate.getFullYear());
    date.setMonth(day.dayDate.getMonth());
    date.setDate(day.dayDate.getDate());

    this.model = new Date(date);

    if (this._configOrDefault.closeAfterSelect) {
      this.hide();
    }
  }

  public show(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    if (this.container === 'body') {
      this._dropdownComponentRef = this._createDropdown();

      this._appendComponentToBody(this._dropdownComponentRef);
    }

    this.onShown.emit();
  }

  public hide(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;

    this._destroyDropdown();

    this.onTouched();

    this.onClose.emit();
  }

  public toggle(): void {
    this._preventCloseOutside = true;

    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }

    setTimeout(() => {
      this._preventCloseOutside = false;
    }, 250);
  }

  private _createDropdown(): ComponentRef<AutomateDatePickerDropdownComponent> {
    const factory = this._componentFactoryResolver.resolveComponentFactory(AutomateDatePickerDropdownComponent);

    const componentRef = factory.create(this._injector);

    componentRef.instance.placement = this.placement;
    componentRef.instance.appendTo = this.appendToTemplateWrapper;

    componentRef.instance.config = this.config;
    componentRef.instance.selectedDate = this.model;
    componentRef.instance.onDaySelected.subscribe((evt: Day) => this.daySelected(evt));

    return componentRef;
  }

  private _destroyDropdown(): void {
    if (!this._dropdownComponentRef) {
      return;
    }

    this._appRef.detachView(this._dropdownComponentRef.hostView);
    this._dropdownComponentRef.destroy();
  }

  private _appendComponentToBody(componentRef: any) {
    // 1. Attach component to the appRef so that it's inside the ng component tree
    this._appRef.attachView(componentRef.hostView);

    // 2. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 3. Append DOM element to the body
    document.body.appendChild(domElem);
  }

  private _updateFormattedDate(): void {
    this.formattedDate = this._model ? DateHelper.toFormat(this._model, this._configOrDefault.format) : null;
  }

  @HostListener('document:click', ['$event'])
  public documentClick(evt: Event): void {
    if (!this._configOrDefault || this._preventCloseOutside) {
      return;
    }

    const exclude = this._parentHasElement(evt.target as HTMLElement, 'automate-datepicker-');

    if (!exclude) {
      this.hide();
    }
  }

  private _parentHasElement(element: HTMLElement, parentElementTagName: string): boolean {
    if (element && element.tagName.startsWith(parentElementTagName.toUpperCase())) {
      return true;
    }

    if (element.parentElement && element.parentElement !== document.body) {
      return this._parentHasElement(element.parentElement, parentElementTagName);
    }

    return false;
  }
}
