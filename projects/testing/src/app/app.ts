import { Component } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {
  DatePickerConfig,
  AutomateDatePickerComponent,
  AppendToTemplateDirective as DatePickerAppendToTemplateDirective,
  EAutomateDatepickerCalendarMode,
} from 'automate-datepicker';
import {
  TimePickerConfig,
  AutomateTimePickerComponent,
  TimeChangedEvent,
  AppendToTemplateDirective as TimePickerAppendToTemplateDirective,
} from 'automate-timepicker';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    AutomateDatePickerComponent,
    DatePickerAppendToTemplateDirective,
    AutomateTimePickerComponent,
    TimePickerAppendToTemplateDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'automate-ui-testing';

  public dateValue: Date = new Date(2026, 2, 6, 12, 34, 0);
  public timeValue: Date | null = null;
  public timeFormatted = '';

  /** Reactive forms test: default time 10 AM, form value set to same 10 AM - verifies writeValue sets time correctly */
  public timeForm: FormGroup;

  public dateConfigs = {
    default: new DatePickerConfig({ closeAfterSelect: true }),
    minDate: new DatePickerConfig({
      closeAfterSelect: true,
      minDate: new Date(),
    }),
    maxDate: new DatePickerConfig({
      closeAfterSelect: true,
      maxDate: new Date(2026, 5, 30),
    }),
    disabledDates: new DatePickerConfig({
      closeAfterSelect: true,
      disabledDates: [
        new Date(2026, 2, 10),
        new Date(2026, 2, 15),
        new Date(2026, 2, 20),
      ],
    }),
    highlightedDates: new DatePickerConfig({
      closeAfterSelect: true,
      hightLightedDates: [
        { date: new Date(2026, 2, 17), style: { background: 'var(--highlight-bg, #e3f2fd)' } },
        { date: new Date(2026, 2, 25), style: { background: 'var(--highlight-bg, #fff3e0)' } },
      ],
    }),
    stayOpen: new DatePickerConfig({ closeAfterSelect: false }),
    startMonths: new DatePickerConfig({
      closeAfterSelect: true,
      startView: EAutomateDatepickerCalendarMode.Months,
    }),
  };

  public timeConfigs = {
    default: new TimePickerConfig({ closeAfterSelect: true }),
    minMax: new TimePickerConfig({
      closeAfterSelect: true,
      minTime: { hour: 8, minutes: 0 },
      maxTime: { hour: 18, minutes: 0 },
    }),
    stayOpen: new TimePickerConfig({ closeAfterSelect: false }),
    defaultTime: new TimePickerConfig({
      closeAfterSelect: true,
      defaultTime: new Date(2026, 2, 17, 13, 30, 0),
    }),
    /** Config with 10 AM default - used for reactive forms test where form value equals default */
    defaultTime10Am: new TimePickerConfig({
      closeAfterSelect: true,
      defaultTime: new Date(2026, 2, 17, 10, 0, 0),
    }),
  };

  constructor(private readonly fb: FormBuilder) {
    this.timeForm = this.fb.group({
      time: [new Date(2026, 2, 17, 10, 0, 0)],
    });
    setTimeout(() => {
      this.timeConfigs.defaultTime.update({
        defaultTime: new Date(2026, 2, 17, 15, 30, 0),
      });
    }, 5000);
  }

  public timeChanged(event: TimeChangedEvent): void {
    this.timeFormatted = event.formattedTime;
  }

  public log(label: string, e: unknown): void {
    console.log(label, e);
  }

  public dateChanged(value: Date): void {
    this.dateValue = value;
  }
}
