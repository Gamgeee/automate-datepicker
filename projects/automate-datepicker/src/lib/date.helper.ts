import { DatePipe } from '@angular/common';
import { Constants } from './constants';

export class DateHelper {
    public static startOfDay(self: Date): Date {
        const result = new Date(self.toDateString());

        return result;
    }


    public static startOfWeek(self: Date): Date {
        const dayOfWeek = self.getDay();

        const result = this.addDays(self, -dayOfWeek);

        return result;
    }


    public static endOfWeek(self: Date): Date {
        const dayOfWeek = self.getDay();

        const result = this.addDays(self, 6 - dayOfWeek);

        return result;
    }


    public static addMinutes(self: Date, minutes: number): Date {
        return new Date(self.getTime() + (minutes * 60 * 1000));
    }


    public static addDays(self: Date, days: number): Date {
        const result = new Date(self.getTime() + (days * 24 * 60 * 60 * 1000));

        const selfTzOffSet = self.getTimezoneOffset();
        const resultTzOffSet = result.getTimezoneOffset();

        return this.addMinutes(result, resultTzOffSet - selfTzOffSet);
    }


    public static toFormat(self: Date, format: string): string {
        const pipe = new DatePipe(Constants.US_LOCALE);

        return pipe.transform(self, format);
    }
}
