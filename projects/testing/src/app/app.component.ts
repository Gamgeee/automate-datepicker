import { Component } from '@angular/core';
import { Constants } from 'projects/automate-datepicker/src/lib/constants';
import { DatePickerConfig } from 'projects/automate-datepicker/src/lib/datepicker/models/datepicker-config';
import { TimePickerConfig } from 'projects/automate-timepicker/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'automate-datepicker';

  public Constants = Constants;

  public value: Date;

  public config: DatePickerConfig = new DatePickerConfig({
    closeAfterSelect: true,
    minDate: new Date()
  });

  public timePickerConfig: TimePickerConfig = {
    closeAfterSelect: false
  };

  constructor() {
    setTimeout(() => {
      this.config.update({
        hightLightedDates: [{ date: new Date(2025, 5, 25), style: { background: 'red' } }]
      });

      
    }, 3000);


    setTimeout(() => {
      this.config.update({
        minDate: new Date(2025, 5, 23)
      });
    }, 8000);

    setTimeout(() => {
      this.config.update({
        disabledDates: [new Date(2025, 5, 27)]
      });
    }, 8000);
  }

  public log(e: any): void {
    console.log(e);
  }

  public dateChanged(value: Date): void {
    // this.value = value;
    console.log(this.value);
  }
}
