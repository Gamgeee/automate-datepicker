import { Component, Output, EventEmitter, Input, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AutomateTimePickerTime } from '../../models/automate-timepicker-time';
import { TimePickerConfig } from '../../models/timepicker-config';
import { Hour } from '../models/hour';
import { AutomateTimePickerClockHandComponent } from '../automate-timepicker-clock-hand/automate-timepicker-clock-hand.component';
import { calcDegreesFromEvent } from '../clock-utils';

@Component({
  selector: 'automate-timepicker-hours-clock',
  standalone: true,
  imports: [CommonModule, AutomateTimePickerClockHandComponent],
  templateUrl: './automate-timepicker-hours-clock.component.html',
  styleUrls: ['../automate-timepicker-clock.component.scss']
})
export class AutomateTimePickerHoursClockComponent implements OnDestroy {
  @Input()
  public set selectedTime(value: AutomateTimePickerTime) {
    this._selectedTime = value;

    this._selectedTimeChanged();
  }
  public get selectedTime(): AutomateTimePickerTime {
    return this._selectedTime;
  }

  @Input()
  public set config(value: TimePickerConfig) {
    this._config = value;

    this._beforeNoonHours.forEach(h => h.setConfig(this._config));
    this._afterNoonHours.forEach(h => h.setConfig(this._config));
  }
  public get config(): TimePickerConfig {
    return this._config;
  }

  @Output()
  public onHourSelected = new EventEmitter<number>();

  @Output()
  public onHourSelectedDuringDrag = new EventEmitter<number>();

  public get hours(): Hour[] {
    return this.selectedTime.isAfterNoon ? this._afterNoonHours : this._beforeNoonHours;
  }

  @ViewChild('clockCircle') clockCircle!: ElementRef<HTMLElement>;

  public selectedHour!: Hour;

  private _beforeNoonHours: Hour[] = [];
  private _afterNoonHours: Hour[] = [];
  private _selectedTime!: AutomateTimePickerTime;
  private _config!: TimePickerConfig;

  private _onSelectedTimeHourChanged: Subscription | null = null;
  private _isDragging = false;
  private _boundMove = (ev: MouseEvent) => this._onDragMove(ev);
  private _boundUp = () => this._onDragEnd();

  constructor(private _cdr: ChangeDetectorRef) {
    this._createHours();
  }

  public ngOnDestroy(): void {
    this._onDragEnd();
    if (this._onSelectedTimeHourChanged) {
      this._onSelectedTimeHourChanged.unsubscribe();
    }
  }

  public selectHour(hour: Hour): void {
    this.onHourSelected.emit(hour.hour);
    this._setSelectedHour();
  }

  public onClockFaceMouseDown(ev: MouseEvent): void {
    ev.preventDefault();
    const circle = this.clockCircle?.nativeElement;
    if (!circle) return;
    this._applyHourFromEvent(ev, circle.getBoundingClientRect());
    this._isDragging = true;
    document.addEventListener('mousemove', this._boundMove);
    document.addEventListener('mouseup', this._boundUp);
  }

  private _onDragMove(ev: MouseEvent): void {
    const circle = this.clockCircle?.nativeElement;
    if (!circle) return;
    this._applyHourFromEvent(ev, circle.getBoundingClientRect());
  }

  private _onDragEnd(): void {
    if (!this._isDragging) return;
    this._isDragging = false;
    document.removeEventListener('mousemove', this._boundMove);
    document.removeEventListener('mouseup', this._boundUp);
    this.onHourSelected.emit(this.selectedHour.hour);
  }

  private _applyHourFromEvent(ev: MouseEvent, rect: DOMRect): void {
    const step = 30;
    const degrees = calcDegreesFromEvent(ev, rect, step);
    let hour = Math.round(degrees / step);
    if (hour >= 12) hour -= 12;
    if (hour === 0) hour = 12;
    const hour24 = this.selectedTime.isAfterNoon ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
    this.onHourSelectedDuringDrag.emit(hour24);
    this._setSelectedHour();
  }

  private _selectedTimeChanged(): void {
    if (!this.selectedTime) {
      return;
    }

    this._onSelectedTimeHourChanged = this.selectedTime.events.onHourChanged.subscribe(() => {
      this._setSelectedHour();
      this._cdr.markForCheck();
    });

    // Defer so selection runs after view is created (component is behind *ngIf)
    setTimeout(() => {
      this._setSelectedHour();
      this._cdr.markForCheck();
    }, 0);
  }

  private _setSelectedHour(): void {
    this._beforeNoonHours.forEach(h => h.setIsSelected(this.selectedTime));
    this._afterNoonHours.forEach(h => h.setIsSelected(this.selectedTime));

    this.selectedHour = this._beforeNoonHours.find(h => h.isSelected) || this._afterNoonHours.find(h => h.isSelected) || this._beforeNoonHours[0];
  }

  private _createHours(): void {
    this._beforeNoonHours = new Array(12).fill(1).map((v, i) => new Hour(i));
    this._afterNoonHours = new Array(12).fill(1).map((v, i) => new Hour(i + 12));
  }
}

