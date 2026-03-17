import { Component, ElementRef, Input, ViewChild, AfterViewChecked } from '@angular/core';
import { ClockItem } from '../models/clock-item.base';

/** Must match itemsCircleRadiusInPx in clock-item.base.ts (clock radius - margin). */
const HAND_LENGTH_PX = 104;
const HAND_THICKNESS_PX = 2;

@Component({
  selector: 'automate-timepicker-clock-hand',
  standalone: true,
  imports: [],
  templateUrl: './automate-timepicker-clock-hand.component.html',
  styleUrls: ['../automate-timepicker-clock.component.scss']
})
export class AutomateTimePickerClockHandComponent implements AfterViewChecked {
  @Input()
  public set selectedItem(value: ClockItem) {
    this._selectedItem = value;
    this._updateHand();
  }
  public get selectedItem(): ClockItem {
    return this._selectedItem;
  }

  @ViewChild('clockHand')
  public clockHand!: ElementRef;

  private _selectedItem!: ClockItem;

  constructor() { }

  ngAfterViewChecked(): void {
    this._updateHand();
  }

  private _updateHand(): void {
    if (!this._selectedItem || !this.clockHand?.nativeElement) return;

    const hand = this.clockHand.nativeElement as HTMLDivElement;
    const angle = this._selectedItem.degree - 270;

    hand.style.top = `calc(50% - ${HAND_THICKNESS_PX / 2}px)`;
    hand.style.left = '50%';
    hand.style.width = `${HAND_LENGTH_PX}px`;
    hand.style.height = `${HAND_THICKNESS_PX}px`;
    hand.style.transform = `rotate(${angle}deg)`;
    hand.style.transformOrigin = 'left center';
  }
}
