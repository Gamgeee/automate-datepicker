import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AutomateTimePickerTime } from '../../models/automate-timepicker-time';
import { TimePickerConfig } from '../../models/timepicker-config';
import { Minutes } from '../models/minutes';
import { AutomateTimePickerClockHandComponent } from '../automate-timepicker-clock-hand/automate-timepicker-clock-hand.component';
import { calcDegreesFromEvent } from '../clock-utils';

@Component({
  selector: 'automate-timepicker-minutes-clock',
  standalone: true,
  imports: [CommonModule, AutomateTimePickerClockHandComponent],
  templateUrl: './automate-timepicker-minutes-clock.component.html',
  styleUrls: ['../automate-timepicker-clock.component.scss']
})
export class AutomateTimePickerMinutesClockComponent implements OnDestroy {
  @Input()
  public set selectedTime(value: AutomateTimePickerTime) {
    this._selectedTime = value;

    this._subscribeToTimeChanges();
    this._setSelectedMinutes();
  }
  public get selectedTime(): AutomateTimePickerTime {
    return this._selectedTime;
  }

  @Input()
  public set config(value: TimePickerConfig) {
    this._config = value;

    this.minutes.forEach(h => h.setConfig(this._config));
  }
  public get config(): TimePickerConfig {
    return this._config;
  }

  @Output()
  public onMinutesSelected = new EventEmitter<number>();

  @Output()
  public onMinutesSelectedDuringDrag = new EventEmitter<number>();

  @ViewChild('clockCircle') clockCircle!: ElementRef<HTMLElement>;

  public minutes: Minutes[] = [];
  public selectedMinutes!: Minutes;

  private _selectedTime!: AutomateTimePickerTime;
  private _config!: TimePickerConfig;
  private _onSelectedTimeMinutesChanged: Subscription | null = null;
  private _isDragging = false;
  private _hasDragged = false;
  private _boundMove = (ev: MouseEvent) => this._onDragMove(ev);
  private _boundUp = () => this._onDragEnd();

  constructor(private _cdr: ChangeDetectorRef) {
    this._createMinutes();
  }

  ngOnDestroy(): void {
    this._onDragEnd();
    if (this._onSelectedTimeMinutesChanged) {
      this._onSelectedTimeMinutesChanged.unsubscribe();
    }
  }

  private _subscribeToTimeChanges(): void {
    if (this._onSelectedTimeMinutesChanged) {
      this._onSelectedTimeMinutesChanged.unsubscribe();
    }
    
    if (!this._selectedTime) return;

    this._onSelectedTimeMinutesChanged = this._selectedTime.events.onMinutesChanged.subscribe(() => {
      this._setSelectedMinutes();
      this._cdr.markForCheck();
    });
  }

  public selectMinutes(minutes: Minutes): void {
    this.onMinutesSelected.emit(minutes.minutes);
    this._setSelectedMinutes();
  }

  public onClockFaceMouseDown(ev: MouseEvent): void {
    ev.preventDefault();
    const circle = this.clockCircle?.nativeElement;
    if (!circle) return;
    this._applyMinuteFromEvent(ev, circle.getBoundingClientRect());
    this._isDragging = true;
    this._hasDragged = false;
    document.addEventListener('mousemove', this._boundMove);
    document.addEventListener('mouseup', this._boundUp);
  }

  private _onDragMove(ev: MouseEvent): void {
    this._hasDragged = true;
    const circle = this.clockCircle?.nativeElement;
    if (!circle) return;
    this._applyMinuteFromEvent(ev, circle.getBoundingClientRect());
  }

  private _onDragEnd(): void {
    if (!this._isDragging) return;
    this._isDragging = false;
    document.removeEventListener('mousemove', this._boundMove);
    document.removeEventListener('mouseup', this._boundUp);
    // Only emit from drag-end when user actually dragged; a simple click is handled by the minute button's mouseup
    if (this._hasDragged) {
      this.onMinutesSelected.emit(this.selectedMinutes.minutes);
    }
  }

  private _applyMinuteFromEvent(ev: MouseEvent, rect: DOMRect): void {
    const step = 6;
    const degrees = calcDegreesFromEvent(ev, rect, step);
    let minute = Math.round(degrees / step);
    if (minute >= 60) minute -= 60;
    this.onMinutesSelectedDuringDrag.emit(minute);
    this._setSelectedMinutes();
  }

  private _setSelectedMinutes(): void {
    if (!this.selectedTime) {
      return;
    }

    this.minutes.forEach(m => m.setIsSelected(this.selectedTime));

    this.selectedMinutes = (this.minutes.find(m => m.isSelected) ?? this.minutes[0])!;
  }

  private _createMinutes(): void {
    this.minutes = new Array(60).fill(1).map((v, i) => new Minutes(i));
  }
}
