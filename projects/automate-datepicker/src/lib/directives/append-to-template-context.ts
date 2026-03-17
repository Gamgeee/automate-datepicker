import { DatePickerConfig } from '../datepicker/models/datepicker-config';

export interface AppendToTemplateContext {
    date: Date;
    config: DatePickerConfig;
    formattedDate: string;
}
