import { Component, Input, HostBinding, ElementRef, ViewChild, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'automate-dropdown-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './automate-dropdown-container.component.html',
  styleUrls: ['./automate-dropdown-container.component.scss']
})
export class AutomateDropdownContainerComponent implements OnInit, OnDestroy {
  @Input()
  public bodyTemplate!: TemplateRef<any>;

  @Input()
  public closing = false;

  @HostBinding('class.is-closing')
  public get isClosingClass(): boolean {
    return this.closing;
  }

  public positionStyle!: Record<string, string>;

  constructor() { }

  public ngOnInit(): void {
    this._updatePositionStyle();
  }

  public ngOnDestroy(): void {
  }

  private _updatePositionStyle(): void {
    this.positionStyle = this._getCenterPosition()
  }

  private _getCenterPosition(): Record<string, string> {
    return {
      position: 'fixed',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      right: 'auto',
      bottom: 'auto'
    };
  }
}
