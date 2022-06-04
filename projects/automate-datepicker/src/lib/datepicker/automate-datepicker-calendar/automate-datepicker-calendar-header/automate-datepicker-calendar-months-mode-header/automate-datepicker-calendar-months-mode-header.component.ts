import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { Year } from '../../../models/year';
import { DatePickerConfig } from '../../../models/datepicker-config';

@Component({
    selector: 'automate-datepicker-calendar-months-mode-header',
    templateUrl: './automate-datepicker-calendar-months-mode-header.component.html',
    styleUrls: ['./automate-datepicker-calendar-months-mode-header.component.scss',
        './../automate-datepicker-calendar-header.component.scss']
})
export class AutomateDatePickerCalendarMonthsModeHeaderComponent {
    @Input()
    public currentYear: Year;
    @Input()
    public config: DatePickerConfig;

    @Output()
    public onMonthSelected = new EventEmitter<number>();
    @Output()
    public onYearSelected = new EventEmitter<number>();
    @Output()
    public onOpenYearsCalendar = new EventEmitter();

    public get isPrevYearEnabled(): boolean {
        return !this.config ||
            !this.config.minDate ||
            this.config.minDate.getFullYear() < this.currentYear.yearNumber;
    }

    public get isNextYearEnabled(): boolean {
        return !this.config ||
            !this.config.maxDate ||
            this.config.maxDate.getFullYear() > this.currentYear.yearNumber;
    }

    public openYearsCalendar(): void {
        this.onOpenYearsCalendar.emit();
    }

    public prevYear(): void {
        if (!this.isPrevYearEnabled) {
            return;
        }

        if (this.currentYear.yearNumber === 0) {
            return;
        }

        this.onYearSelected.emit(this.currentYear.yearNumber - 1);
    }

    public nextYear(): void {
        if (!this.isNextYearEnabled) {
            return;
        }

        this.onYearSelected.emit(this.currentYear.yearNumber + 1);
    }
}
