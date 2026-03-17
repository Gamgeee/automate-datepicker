import { TimePickerConfig } from '../timepicker/models/timepicker-config';

export interface AppendToTemplateContext {
    dateTime: Date;
    config: TimePickerConfig;
    formattedTime: string;
}
