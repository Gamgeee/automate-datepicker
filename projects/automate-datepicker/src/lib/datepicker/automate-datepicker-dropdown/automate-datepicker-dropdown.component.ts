import { Component, Input, ElementRef, ViewChild, Output, EventEmitter, OnDestroy, OnInit, TemplateRef, ContentChild } from '@angular/core';
import { AutomateDatePickerCalendarContainerComponent } from '../automate-datepicker-calendar-container/automate-datepicker-calendar-container.component';
import { Day } from '../models/day';
import { DatePickerConfig } from '../models/datepicker-config';
import { MonthChangedEvent } from '../events/month-changed-event';

@Component({
  selector: 'automate-datepicker-dropdown',
  templateUrl: './automate-datepicker-dropdown.component.html',
  styleUrls: ['./automate-datepicker-dropdown.component.scss']
})
export class AutomateDatePickerDropdownComponent implements OnInit, OnDestroy {
  @Input()
  public appendTo: ElementRef;

  @Input()
  public placement: 'left' | 'right' = 'left';

  @Input()
  public theme: string;

  @Input()
  public selectedDate: Date;

  @Input()
  public config: DatePickerConfig;

  @ContentChild('footerTemplate')
  public footerTemplate: TemplateRef<any>;

  @Output()
  public onDaySelected = new EventEmitter<Day>();

  @Output()
  public onMonthChanged = new EventEmitter<MonthChangedEvent>();

  @Output()
  public onYearChanged = new EventEmitter<number>();

  @ViewChild('container')
  public container: AutomateDatePickerCalendarContainerComponent;

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
    this.positionStyle = this._getAppendToPositions();
  }

  private _getAppendToPositions(): CSSStyleDeclaration {
    return { top: this._getTop(), left: this._getLeft() } as CSSStyleDeclaration;
  }

  private _getTop(): string {
    const positions = this._appendToElement.getBoundingClientRect();

    return `${positions.top + this._appendToElement.offsetHeight + window.pageYOffset}px`;
  }

  private _getLeft(): string {
    const positions = this._appendToElement.getBoundingClientRect();

    if (this.placement === 'left') {
      return `${positions.left + window.pageXOffset}px`;
    }

    if (this.placement === 'right') {
      const containerElement = this.container.containerElement.nativeElement as HTMLElement;

      const appendToPosition = this._appendToElement.getBoundingClientRect();

      return `${appendToPosition.right - containerElement.offsetWidth + window.pageXOffset}px`;
    }

    throw new Error('Placement not supported.');
  }
}
