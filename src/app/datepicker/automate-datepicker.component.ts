import { Component, forwardRef, Input, Output, EventEmitter, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentFactory, ComponentRef, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutomateDatePickerDropdownComponent } from './automate-datepicker-dropdown/automate-datepicker-dropdown.component';
import { Day } from './models/day';
import { DatePickerConfig } from './models/datepicker-config';

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
export class AutomateDatePickerComponent {
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

  @ViewChild('datepickerInput')
  public datePickerInput: ElementRef;

  @ViewChild('appendToWrapper')
  public appendToWrapper: ElementRef;

  public get showInput(): boolean {
    return !this._appendToElement;
  }

  // get value for component from private variable
  public get model(): Date { return this._model; }
  // set the value (emit) to the parent model
  public set model(v: Date) {
    if (v !== this._model) {
      this._model = v;
      this.onChange(v);
      this._updateFormattedDate();
    }
  }

  public formattedDate: string;

  public isOpen: boolean;

  private get _appendToElement(): HTMLElement {
    return (this.appendToWrapper && this.appendToWrapper.nativeElement) ?
      (this.appendToWrapper.nativeElement as HTMLElement).children[0] as HTMLElement : null;
  }

  private _model: Date;
  private _config: DatePickerConfig;

  private _dropdownComponentRef: ComponentRef<AutomateDatePickerDropdownComponent>;

  constructor(
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    private readonly _appRef: ApplicationRef,
    private readonly _injector: Injector
  ) {
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



  public clickOutside(evt: Event): void {
    const exclude = this._parentHasElement(evt.target as HTMLElement, 'automate-datepicker-');

    if (!exclude) {
      this.hide();
    }
  }

  public daySelected(day: Day): void {
    this.model = day.dayDate;
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

    if (this.container === 'body') {
      this._destroyDropdown();
    }

    this.onClose.emit();
  }

  public toggle(): void {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  private _createDropdown(): ComponentRef<AutomateDatePickerDropdownComponent> {
    const factory = this._componentFactoryResolver.resolveComponentFactory(AutomateDatePickerDropdownComponent);

    const componentRef = factory.create(this._injector);

    componentRef.instance.placement = this.placement;
    componentRef.instance.appendTo = this._appendToElement ? new ElementRef(this._appendToElement) : this.datePickerInput;

    componentRef.instance.config = this.config;
    componentRef.instance.selectedDate = this.model;
    componentRef.instance.onDaySelected.subscribe((evt: Day) => this.daySelected(evt));

    return componentRef;
  }

  private _destroyDropdown(): void {
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

  private _parentHasElement(element: HTMLElement, parentElementTagName: string): boolean {
    if (element && element.tagName.startsWith(parentElementTagName.toUpperCase())) {
      return true;
    }

    if (element.parentElement && element.parentElement !== document.body) {
      return this._parentHasElement(element.parentElement, parentElementTagName);
    }

    return false;
  }

  private _updateFormattedDate(): void {
    const config = DatePickerConfig.createDefaultOrUseExisting(this.config);

    this.formattedDate = this._model ? this._model.toFormat(config.format) : null;
  }
}
