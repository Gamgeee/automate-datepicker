import { EAutomateDatepickerCalendarMode } from '../enums/e-automate-datepicker-calendar-mode';
import { Constants } from 'src/app/constants';

export class DatePickerConfig {
    public format?: string; // +
    public minDate?: Date; // +
    public maxDate?: Date; // +
    public disabledDaysOfWeek?: number[]; // +
    public disabledDates?: Date[]; // +
    public hightLightedDates?: HightLightedDateConfig[]; // +

    public startView?: EAutomateDatepickerCalendarMode; // +

    // datepicker format options
    public monthTitle?: string;
    public yearTitle?: string;
    public dayLabel?: string;
    public monthLabel?: string;
    public yearLabel?: string;

    public static createDefaultOrUseExisting(existing?: DatePickerConfig): DatePickerConfig {
        return {
            format: existing.format || Constants.DEFAULT_DATE_FORMAT,
            yearTitle: existing.yearTitle || Constants.DEFAULT_YEAR_FORMAT,
            monthTitle: existing.monthTitle || Constants.DEFAULT_MONTH_FORMAT,
            monthLabel: existing.monthLabel || Constants.DEFAULT_MONTH_FORMAT,
            yearLabel: existing.yearLabel || Constants.DEFAULT_YEAR_FORMAT,
            dayLabel: existing.dayLabel || Constants.DEFAULT_DAY_FORMAT
        };
    }
}

export class HightLightedDateConfig {
    public date: Date;
    public style?: Partial<CSSStyleDeclaration>;
}
