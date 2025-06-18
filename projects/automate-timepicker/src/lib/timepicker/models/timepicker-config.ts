export class TimePickerConfig {
  public closeAfterSelect?: boolean;
  public defaultTime?: Date;
  public locale?: string;

  public timeFormat?: string;

  public headerHoursFormat?: string;
  public headerMinutesFormat?: string;

  public hoursFormat?: string;
  public minutesFormat?: string;

  public static createDefaultOrUseExisting(existing?: TimePickerConfig): TimePickerConfig {
    existing = existing || {};

    const startOfDay = new Date();
    startOfDay.setHours(0);
    startOfDay.setMinutes(0);
    startOfDay.setSeconds(0);
    startOfDay.setMilliseconds(0);

    return {
      defaultTime: existing.defaultTime || startOfDay,
      locale: existing.locale || 'en-US',
      timeFormat: existing.timeFormat || 'hh:mm a',
      hoursFormat: existing.hoursFormat || 'hh',
      minutesFormat: existing.minutesFormat || 'm',
      headerHoursFormat: existing.headerHoursFormat || 'hh',
      headerMinutesFormat: existing.headerMinutesFormat || 'mm',
      closeAfterSelect: existing.closeAfterSelect === false ? false : true
    };
  }
}