import { EAutomateDatepickerCalendarMode } from '../enums/e-automate-datepicker-calendar-mode';
import { Constants } from '../../constants';
import { Subject } from 'rxjs';


export class DatePickerConfig {
    public format?: string;
    public minDate?: Date;
    public maxDate?: Date;
    public disabledDaysOfWeek?: number[];
    public disabledDates?: Date[];
    public hightLightedDates?: HightLightedDateConfig[];
    public daysOfWeek?: string[];
    public startView?: EAutomateDatepickerCalendarMode;
    public closeAfterSelect?: boolean;
    public showTodayDay?: boolean;

    public monthTitle?: string;
    public yearTitle?: string;
    public dayLabel?: string;
    public monthLabel?: string;
    public yearLabel?: string;

    public onUpdated = new Subject();

    constructor(initData?: Partial<DatePickerConfig>) {
        if (initData) {
            Object.assign(this, initData);
        }
    }

    public init(data: Partial<DatePickerConfig>): void {
        Object.assign(this, data);
    }

    public update(newData: Partial<DatePickerConfig>): void {
        Object.assign(this, newData);

        this.onUpdated.next();
    }

    public static createDefaultOrUseExisting(existing?: DatePickerConfig): DatePickerConfig {
        const result = existing || new DatePickerConfig();
        result.init({
            format: result.format || Constants.DEFAULT_DATE_FORMAT,
            yearTitle: result.yearTitle || Constants.DEFAULT_YEAR_FORMAT,
            monthTitle: result.monthTitle || Constants.DEFAULT_MONTH_FORMAT,
            monthLabel: result.monthLabel || Constants.DEFAULT_MONTH_FORMAT,
            yearLabel: result.yearLabel || Constants.DEFAULT_YEAR_FORMAT,
            dayLabel: result.dayLabel || Constants.DEFAULT_DAY_FORMAT,
            disabledDates: result.disabledDates,
            disabledDaysOfWeek: result.disabledDaysOfWeek,
            hightLightedDates: result.hightLightedDates,
            maxDate: result.maxDate,
            minDate: result.minDate,
            startView: result.startView || EAutomateDatepickerCalendarMode.Days,
            closeAfterSelect: result.closeAfterSelect === false ? false : true,
            showTodayDay: result.showTodayDay === false ? false : true,
            daysOfWeek: result.daysOfWeek || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        });

        return result;
    }
}

export class HightLightedDateConfig {
    public date: Date;
    public style: Partial<CSSStyleDeclaration>;
}
