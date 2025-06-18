import {
  Component, Input, Output, EventEmitter, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef,
  ComponentRef, HostListener, ViewChild, ElementRef, TemplateRef
} from '@angular/core';
import { AutomateDropdownContainerComponent } from '../automate-dropdown-container/automate-dropdown-container.component';

@Component({
  selector: 'automate-dropdown',
  templateUrl: './automate-dropdown.component.html',
  styleUrls: ['./automate-dropdown.component.scss']
})
export class AutomateDropdownComponent {
  @Input()
  public disabled: boolean;
  @Input()
  public container: '' | 'body' = '';
  @Input()
  public placement: 'left' | 'right' = 'left';
  @Input()
  public closeOnOutsideClick = true;

  @Output()
  public onOpened = new EventEmitter();
  @Output()
  public onClosed = new EventEmitter();

  @ViewChild('appendToTmpWrapper')
  public appendToTemplateWrapper: ElementRef;

  @ViewChild('dropdownBodyTemplate')
  public dropdownBodyTemplate: TemplateRef<any>;

  public isOpen: boolean;

  private _dropdownContainerComponentRef: ComponentRef<AutomateDropdownContainerComponent>;

  private _preventCloseOutside: boolean;

  constructor(
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    private readonly _appRef: ApplicationRef,
    private readonly _injector: Injector
  ) {
  }

  public ngOnDestroy(): void {
    this._destroyDropdownContainer();
  }

  public show(): void {
    if (this.disabled) {
      return;
    }

    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    if (this.container === 'body') {
      this._dropdownContainerComponentRef = this._createDropdownContainer();

      this._appendComponentToBody(this._dropdownContainerComponentRef);
    }

    this.onOpened.emit();
  }

  public hide(): void {
    if (this.disabled) {
      return;
    }

    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;

    this._destroyDropdownContainer();

    this.onClosed.emit();
  }

  public toggle(): void {
    if (this.disabled) {
      return;
    }

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

  private _createDropdownContainer(): ComponentRef<AutomateDropdownContainerComponent> {
    const factory = this._componentFactoryResolver.resolveComponentFactory(AutomateDropdownContainerComponent);

    const componentRef = factory.create(this._injector);

    componentRef.instance.container = this.container;
    componentRef.instance.placement = this.placement;
    componentRef.instance.appendTo = this.appendToTemplateWrapper;
    componentRef.instance.bodyTemplate = this.dropdownBodyTemplate;

    return componentRef;
  }

  private _destroyDropdownContainer(): void {
    if (!this._dropdownContainerComponentRef) {
      return;
    }

    this._appRef.detachView(this._dropdownContainerComponentRef.hostView);
    this._dropdownContainerComponentRef.destroy();
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

  @HostListener('document:click', ['$event'])
  public documentClick(evt: Event): void {
    if (!this.closeOnOutsideClick || this._preventCloseOutside) {
      return;
    }

    const exclude = this._parentHasElement(evt.target as HTMLElement, 'automate-dropdown-');

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
