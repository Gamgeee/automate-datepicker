import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ClockItem } from '../models/clock-item.base';

@Component({
  selector: 'automate-timepicker-clock-hand',
  templateUrl: './automate-timepicker-clock-hand.component.html',
  styleUrls: ['../automate-timepicker-clock.component.scss']
})
export class AutomateTimePickerClockHandComponent {
  @Input()
  public clockCenter: HTMLElement;

  @Input()
  public set selectedItem(value: ClockItem) {
    this._selectedItem = value;

    this.connect();
  }
  public get selectedItem(): ClockItem {
    return this._selectedItem;
  }

  @ViewChild('clockHand')
  public clockHand: ElementRef;

  private _selectedItem: ClockItem;

  constructor() { }

  public connect() {
    if (!this.clockCenter || !this.selectedItem || !document.getElementById(this.selectedItem.id)) {
      setTimeout(() => {
        this.connect();
      });
      return;
    }

    const itemElement = document.getElementById(this.selectedItem.id);
    const thickness = 2;

    const off1 = this._getOffset(this.clockCenter);
    const off2 = this._getOffset(itemElement);

    // bottom right
    const x1 = off1.left + off1.width;
    const y1 = off1.top + off1.height;
    // top right
    const x2 = off2.left + off2.width;
    const y2 = off2.top + off2.height;
    // distance
    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    // center
    const cx = ((x1 + x2) / 2) - (length / 2);
    const cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

    // line creation
    const hand = this.clockHand.nativeElement as HTMLDivElement;
    hand.style.top = `${cy}px`;
    hand.style.left = `${cx}px`;
    hand.style.width = `${length}px`;
    hand.style.transform = `rotate(${angle}deg)`;
    hand.style.transformOrigin = `rotate(${angle}deg)`;
  }

  private _getOffset(el: HTMLElement): { left: number, top: number, width: number, height: number } {
    const rect = el.getBoundingClientRect();

    return {
      left: el.offsetLeft - rect.width / 2,
      top: el.offsetTop - rect.height / 2,
      width: rect.width || el.offsetWidth,
      height: rect.height || el.offsetHeight
    };
  }
}
