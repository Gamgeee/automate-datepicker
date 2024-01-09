import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { YearsRange } from 'src/app/datepicker/models/years-range';
import { DatePickerConfig } from 'src/app/datepicker/models/datepicker-config';

@Component({
    selector: 'automate-datepicker-calendar-years-mode-header',
    templateUrl: './automate-datepicker-calendar-years-mode-header.component.html',
    styleUrls: ['./automate-datepicker-calendar-years-mode-header.component.scss',
        './../automate-datepicker-calendar-header.component.scss']
})
export class AutomateDatePickerCalendarYearsModeHeaderComponent implements OnInit {
    @Input()
    public currentYearsRange: YearsRange;
    @Input()
    public config: DatePickerConfig;

    @Output()
    public onNextYearsRange = new EventEmitter();
    @Output()
    public onPrevYearsRange = new EventEmitter();

    public get isPrevRangeEnabled(): boolean {
        return !this.config ||
            !this.config.minDate ||
            this.config.minDate.getFullYear() < this.currentYearsRange.startYear;
    }

    public get isNextRangeEnabled(): boolean {
        return !this.config ||
            !this.config.maxDate ||
            this.config.maxDate.getFullYear() > this.currentYearsRange.endYear;
    }

    public ngOnInit(): void {

    }

    public prevRange(): void {
        if (!this.isPrevRangeEnabled) {
            return;
        }

        this.onPrevYearsRange.emit();
    }

    public nextRange(): void {
        if (!this.isNextRangeEnabled) {
            return;
        }

        this.onNextYearsRange.emit();
    }
}
