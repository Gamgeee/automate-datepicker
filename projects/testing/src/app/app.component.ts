import { Component } from '@angular/core';
import { Constants } from 'projects/automate-datepicker/src/lib/constants';
import { DatePickerConfig } from 'projects/automate-datepicker/src/lib/datepicker/models/datepicker-config';
import { BsModalService } from 'ngx-bootstrap';
import { SimpleModalComponent } from './simple-modal.component';
import { TimePickerConfig } from 'projects/automate-timepicker/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'automate-datepicker';

  public Constants = Constants;

  public value: Date;

  public config: DatePickerConfig = {
    closeAfterSelect: false,
    minDate: new Date()
  };

  public timePickerConfig: TimePickerConfig = {
    closeAfterSelect: false
  };

  constructor(private readonly modalService: BsModalService) {
  
  }

  public showModal(): void {
    this.modalService.show(SimpleModalComponent, {
      class: 'modal-sm',
      animated: true
    });
  }

  public dateChanged(value: Date): void {
    this.value = value;
    console.log(value);
  }
}
