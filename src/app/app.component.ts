import { Component } from '@angular/core';
import { DateExtensions } from './extensions/date.extensions';
import { Constants } from './constants';
import { DatePickerConfig } from './datepicker/models/datepicker-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'automate-datepicker';

  public Constants = Constants;

  public value: Date = new Date();

  public config: DatePickerConfig = {
    minDate: new Date(1981, 7, 8),
    maxDate: new Date(2029, 7, 8),
    disabledDates: [new Date(2022, 4, 16)],
    hightLightedDates: [
      { date: new Date(2022, 4, 20), style: { background: '#45D09E', color: 'white' } }
    ]
  };

  constructor() {
    DateExtensions.load();
  }

  public dateChanged(value: Date): void {
    this.value = value;

    console.log(this.value);
  }
}
