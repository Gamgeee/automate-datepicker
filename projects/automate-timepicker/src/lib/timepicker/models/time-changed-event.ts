import { TimePickerTime } from './timepicker-time';

export interface TimeChangedEvent extends TimePickerTime {
    formattedTime: string;
    dateTime: Date;
}