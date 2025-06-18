import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutomateDropdownContainerComponent } from './automate-dropdown-container/automate-dropdown-container.component';
import { AutomateDropdownComponent } from './automate-dropdown/automate-dropdown.component';
import { AutomateSnowFlakesComponent } from './automate-snowflakes/automate-snowflakes.component';

@NgModule({
  declarations: [
    AutomateDropdownContainerComponent,
    AutomateDropdownComponent,
    AutomateSnowFlakesComponent
  ],
  entryComponents: [AutomateDropdownContainerComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AutomateDropdownComponent,
    AutomateSnowFlakesComponent
  ]
})
export class AutomateSharedModule { }
