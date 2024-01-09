import { DatePipe } from '@angular/common';
import { Constants } from '../constants';

export class DateExtensions {
    public static load() { }
}

declare global {
    interface Date {
        startOfDay(): Date;
        endOfDay(): Date;

        startOfWeek(): Date;
        endOfWeek(): Date;

        startOfMonth(): Date;
        endOfMonth(): Date;

        addSeconds(seconds: number): Date;
        addMinutes(minutes: number): Date;
        addHours(hours: number): Date;
        addDays(days: number): Date;
        addMonths(months: number): Date;
        addYears(years: number): Date;

        toFormat(format: string): string;
    }
}

Date.prototype.startOfDay = function (): Date {
    const self = this as Date;

    const result = new Date(self.toDateString());

    return result;
};

Date.prototype.endOfDay = function (): Date {
    const self = this as Date;

    const result = new Date(self.toDateString());

    return result.addHours(23).addMinutes(59).addSeconds(59);
};

Date.prototype.startOfWeek = function (): Date {
    const self = this as Date;

    const dayOfWeek = self.getDay();

    const result = self.addDays(-dayOfWeek);

    return result;
};

Date.prototype.endOfWeek = function (): Date {
    const self = this as Date;

    const dayOfWeek = self.getDay();

    const result = self.addDays(6 - dayOfWeek);

    return result;
};

Date.prototype.startOfMonth = function (): Date {
    const self = this as Date;

    return self.addDays(-self.getDate() + 1);
};

Date.prototype.endOfMonth = function (): Date {
    const self = this as Date;

    const daysInMonth = new Date(self.getFullYear(), self.getMonth() + 1, 0).getDate();

    return self.addDays(daysInMonth - self.getDate());
};

Date.prototype.addSeconds = function (seconds: number): Date {
    const self = this as Date;

    return new Date(self.getTime() + (seconds * 1000));
};

Date.prototype.addMinutes = function (minutes: number): Date {
    const self = this as Date;

    return new Date(self.getTime() + (minutes * 60 * 1000));
};

Date.prototype.addHours = function (hours: number): Date {
    const self = this as Date;

    return new Date(self.getTime() + (hours * 60 * 60 * 1000));
};

Date.prototype.addDays = function (days: number): Date {
    const self = this as Date;

    const result = new Date(self.getTime() + (days * 24 * 60 * 60 * 1000));

    const selfTzOffSet = self.getTimezoneOffset();
    const resultTzOffSet = result.getTimezoneOffset();

    return result.addMinutes(resultTzOffSet - selfTzOffSet);
};

Date.prototype.addMonths = function (months: number): Date {
    const self = this as Date;

    self.setMonth(self.getMonth() + months);

    return self;
};

Date.prototype.addYears = function (years: number): Date {
    const self = this as Date;

    self.setFullYear(self.getFullYear() + years);

    return self;
};

Date.prototype.toFormat = function (format: string): string {
    const self = this as Date;

    const pipe = new DatePipe(Constants.US_LOCALE);

    return pipe.transform(self, format);
};
