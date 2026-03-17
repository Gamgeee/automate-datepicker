import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerConfig, AutomateDatePickerComponent } from 'automate-datepicker';
import { TimePickerConfig, AutomateTimePickerComponent, TimeChangedEvent, AppendToTemplateDirective } from 'automate-timepicker';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    DatePipe,
    AutomateDatePickerComponent,
    AutomateTimePickerComponent,
    AppendToTemplateDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'automate-datepicker';

  public value!: Date;
  public timeValue: string = '12:00 AM';

  public config: DatePickerConfig = new DatePickerConfig({
    closeAfterSelect: true,
    minDate: new Date()
  });

  public timePickerConfig: TimePickerConfig = {
    closeAfterSelect: true,
    minTime: { hour: 10, minutes: 33 },
  };

  constructor() {
    this.value = new Date(2026, 2, 6, 12, 34, 0);
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

  public timeChanged(event: TimeChangedEvent): void {
    this.timeValue = event.formattedTime;
  }

  public log(e: any): void {
    console.log(e);
  }

  public dateChanged(value: Date): void {
    this.value = value;
    console.log(this.value);
  }
}
