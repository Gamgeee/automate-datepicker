import {
  Component, Input, Output, EventEmitter, ApplicationRef, ComponentRef,
  createComponent, EnvironmentInjector, HostListener, ViewChild, ElementRef,
  TemplateRef, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomateDropdownContainerComponent } from '../automate-dropdown-container/automate-dropdown-container.component';

@Component({
  selector: 'automate-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './automate-dropdown.component.html',
  styleUrls: [
    './automate-dropdown.component.scss',
    '../theme/default.scss',
    '../theme/dark.scss',
    '../theme/christmas.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AutomateDropdownComponent {
  @Input()
  public disabled!: boolean;
  @Input()
  public closeOnOutsideClick = true;

  @Output()
  public onOpened = new EventEmitter<void>();
  @Output()
  public onClosed = new EventEmitter<void>();

  @ViewChild('dropdownBodyTemplate')
  public dropdownBodyTemplate!: TemplateRef<any>;

  public isOpen = false;

  private _dropdownContainerComponentRef: ComponentRef<AutomateDropdownContainerComponent> | null = null;

  private _dropdownBodyHostElement: HTMLElement | null = null;

  private _preventCloseOutside = false;

  constructor(
    private readonly _appRef: ApplicationRef,
    private readonly _environmentInjector: EnvironmentInjector
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

    this._dropdownContainerComponentRef = this._createDropdownContainer();

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

    const ref = this._dropdownContainerComponentRef;
    if (ref) {
      ref.instance.closing = true;
      ref.changeDetectorRef.detectChanges();

      // wait for the animation to finish
      setTimeout(() => {
        this._destroyDropdownContainer();
        this.onClosed.emit();
      }, 200);
    } else {
      this._destroyDropdownContainer();
      this.onClosed.emit();
    }
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
    // createComponent() without hostElement so Angular creates the real host (<automate-dropdown-container>).
    // Then we append that host to body so the component's styles are applied.
    const componentRef = createComponent(AutomateDropdownContainerComponent, {
      environmentInjector: this._environmentInjector
    });

    componentRef.instance.bodyTemplate = this.dropdownBodyTemplate;

    this._appendComponentToBody(componentRef);
    this._dropdownBodyHostElement = componentRef.location.nativeElement;

    return componentRef;
  }

  private _appendComponentToBody(componentRef: ComponentRef<AutomateDropdownContainerComponent>): void {
    this._appRef.attachView(componentRef.hostView);
    document.body.appendChild(componentRef.location.nativeElement);
  }

  private _destroyDropdownContainer(): void {
    if (!this._dropdownContainerComponentRef) {
      return;
    }

    this._appRef.detachView(this._dropdownContainerComponentRef.hostView);
    this._dropdownContainerComponentRef.destroy();
    this._dropdownContainerComponentRef = null;

    if (this._dropdownBodyHostElement?.parentNode) {
      this._dropdownBodyHostElement.parentNode.removeChild(this._dropdownBodyHostElement);
    }
    this._dropdownBodyHostElement = null;
  }

  @HostListener('document:click', ['$event'])
  public documentClick(evt: Event): void {
    if (!this.closeOnOutsideClick || this._preventCloseOutside) {
      return;
    }

    const exclude = this._parentHasElement(evt.target as HTMLElement, 'automate-timepicker-popup');

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
