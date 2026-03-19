import { Subject } from 'rxjs';
import { TimePickerTime } from "./timepicker-time";

export class TimePickerConfig {
  public closeAfterSelect?: boolean;
  public defaultTime?: Date;
  public locale?: string;

  public timeFormat?: string;

  public headerHoursFormat?: string;
  public headerMinutesFormat?: string;

  public hoursFormat?: string;
  public minutesFormat?: string;

  public minTime?: TimePickerTime;
  public maxTime?: TimePickerTime;

  public onUpdated = new Subject<void>();

  constructor(initData?: Partial<TimePickerConfig>) {
    if (initData) {
      Object.assign(this, initData);
    }
  }

  public static createDefaultOrUseExisting(existing: TimePickerConfig | null = null): TimePickerConfig {
    existing = existing || new TimePickerConfig();

    const startOfDay = new Date();
    startOfDay.setHours(0);
    startOfDay.setMinutes(0);
    startOfDay.setSeconds(0);
    startOfDay.setMilliseconds(0);

    return Object.assign(new TimePickerConfig(), {
      defaultTime: existing.defaultTime || startOfDay,
      locale: existing.locale || 'en-US',
      timeFormat: existing.timeFormat || 'hh:mm a',
      hoursFormat: existing.hoursFormat || 'h',
      minutesFormat: existing.minutesFormat || 'm',
      headerHoursFormat: existing.headerHoursFormat || 'h',
      headerMinutesFormat: existing.headerMinutesFormat || 'mm',
      closeAfterSelect: existing.closeAfterSelect === false ? false : true,
      minTime: existing.minTime,
      maxTime: existing.maxTime
    });
  }


  public update(newData: Partial<TimePickerConfig>): void {
    Object.assign(this, newData);
    this.onUpdated.next();
  }
}