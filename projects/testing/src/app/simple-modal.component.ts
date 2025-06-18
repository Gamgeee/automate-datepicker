import { Component } from '@angular/core';
import { Constants } from 'projects/automate-datepicker/src/lib/constants';
import { DatePickerConfig } from 'projects/automate-datepicker/src/lib/datepicker/models/datepicker-config';
import { BsModalService } from 'ngx-bootstrap';

@Component({
    templateUrl: './simple-modal.component.html'
})
export class SimpleModalComponent {
    title = 'automate-datepicker';

    public Constants = Constants;

    public value: Date;

    public config: DatePickerConfig = {
    };

    constructor(private readonly modalService: BsModalService) {
    }

    public dateChanged(value: Date): void {
        this.value = value;
    }
}
