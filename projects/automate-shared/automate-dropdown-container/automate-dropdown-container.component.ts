import { Component, Input, ElementRef, ViewChild, OnDestroy, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'automate-dropdown-container',
  templateUrl: './automate-dropdown-container.component.html',
  styleUrls: ['./automate-dropdown-container.component.scss']
})
export class AutomateDropdownContainerComponent implements OnInit, OnDestroy {
  @Input()
  public container: '' | 'body' = '';
  @Input()
  public placement: 'left' | 'right' = 'left';
  @Input()
  public bodyTemplate: TemplateRef<any>;
  @Input()
  public appendTo: ElementRef;


  @ViewChild('bodyWrapper')
  public bodyWrapper: ElementRef;

  public positionStyle: CSSStyleDeclaration;

  private get _appendToElement(): HTMLElement {
    return this.appendTo.nativeElement as HTMLElement;
  }

  private _timer: any;

  constructor() { }

  public ngOnInit(): void {
    this._updatePositionStyle();

    this._timer = setInterval(() => {
      this._updatePositionStyle();
    }, 250);
  }

  public ngOnDestroy(): void {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  private _updatePositionStyle(): void {
    this.positionStyle = this.container === 'body' ? this._getBodyAppendToPositions() : this._getAppendToPositions();
  }

  // body
  private _getBodyAppendToPositions(): CSSStyleDeclaration {
    return { top: this._getBodyTop(), left: this._getBodyLeft() } as CSSStyleDeclaration;
  }

  private _getBodyTop(): string {
    const positions = this._appendToElement.getBoundingClientRect();

    return `${positions.top + this._appendToElement.offsetHeight + window.pageYOffset}px`;
  }

  private _getBodyLeft(): string {
    const positions = this._appendToElement.getBoundingClientRect();

    if (this.placement === 'left') {
      return `${positions.left + window.pageXOffset}px`;
    }

    if (this.placement === 'right') {
      const bodyWrapperElement = this.bodyWrapper.nativeElement as HTMLElement;

      const appendToPosition = this._appendToElement.getBoundingClientRect();

      return `${appendToPosition.right - bodyWrapperElement.offsetWidth + window.pageXOffset}px`;
    }

    throw new Error('Placement not supported.');
  }

  // element
  private _getAppendToPositions(): CSSStyleDeclaration {
    return { left: this._getLeft(), top: this._getTop() } as CSSStyleDeclaration;
  }

  private _getLeft(): string {
    if (!this.bodyWrapper || !this._appendToElement) {
      return '';
    }

    if (this.placement === 'left') {
      return `-${this._appendToElement.offsetWidth}px`;
    }

    if (this.placement === 'right') {
      const bodyWrapperElement = this.bodyWrapper.nativeElement as HTMLElement;

      return `-${bodyWrapperElement.offsetWidth}px`;
    }

    throw new Error('Placement not supported.');
  }

  private _getTop(): string {
    if (!this.bodyWrapper || !this._appendToElement) {
      return '';
    }

    return `${this._appendToElement.offsetHeight}px`;
  }
}
