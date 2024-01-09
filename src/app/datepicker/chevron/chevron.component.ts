import { Component, Input } from '@angular/core';

@Component({
  selector: 'chevron',
  templateUrl: './chevron.component.html',
  styleUrls: ['./chevron.component.scss']
})
export class ChevronComponent {
  @Input()
  public orientation: 'left' | 'right';
}
