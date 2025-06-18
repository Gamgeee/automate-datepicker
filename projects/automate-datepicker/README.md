## Automate DatePicker

Automate datepicker is a simple datepicker for Automate web sites purposes. 

## **Features**

*   [x] Custom formatting
*   [x] Min/Max date restriction
*   [x] Ability to disable specific days of week
*   [x] Ability to disable specific dates
*   [x] Ability to hightlight specific dates
*   [x] Ability to change initial view (days, month, year)
*   [x] Custom template
*   [x] Accessibility
*   [x] Themes

## **Warning**

Library is under active development and may have API breaking changes for subsequent major versions after 1.0.0.

## **Getting started**

### Step 1: Install `automate-datepicker`**:**

#### NPM

```plaintext
npm install --save @automate-datepicker
```

### Step 2: Import the AutomateDatePickerModule and angular FormsModule module:

```typescript
import { AutomateDatePickerModule } from 'automate-datepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [AutomateDatePickerModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### **Usage**

Define options in your consuming component:

```typescript
@Component({...})
export class ExampleComponent {
    selectedDate: Date;
}
```

In template use `automate-datepicker` component with your options

```html
<!--Using template-->
<automate-datepicker [(ngModel)]="selectedDate">
    <ng-template appendToTmp let-formattedDate="formattedDate">

        <button>{{formattedDate}}</button>

    </ng-template>
</automate-datepicker>

<!--Simple use-->
<automate-datepicker [(ngModel)]="selectedDate">
</automate-datepicker>
```

## API

---

### Inputs

<table><tbody><tr><td><strong>Input</strong></td><td><strong>Type</strong></td><td><strong>Default</strong></td><td><strong>Required</strong></td><td><strong>Description</strong></td></tr><tr><td>[container]</td><td><code>string</code> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</td><td><code>null</code></td><td>no</td><td>Append dropdown to body or any other element using css selector. For correct positioning <code>body</code> should have <code>position:relative</code></td></tr><tr><td>[placeholder]</td><td><code>string</code></td><td>-</td><td>no</td><td style="border:1px solid var(--color-border-default);padding:6px 13px;">The date-picker input placeholder</td></tr><tr><td>[disabled]</td><td><code>boolean</code></td><td><code>false</code></td><td>no</td><td>If set to true the input would be disabled</td></tr><tr><td>[placement]</td><td><code>'left' | 'right'</code></td><td><code>left</code> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td><td>no</td><td>Set the dropdown position on open</td></tr><tr><td>[theme]</td><td><p><code>'default' | 'dark' |&nbsp;</code></p><p><code>'default christmas' |&nbsp;</code></p><p><code>'dark christmas'</code></p></td><td><code>default</code></td><td>no</td><td>Theme is a class added to the popup container (and inner components) - this will allow styling of the calendar when it's appended to outer element (for example - body)</td></tr><tr><td>[config]</td><td>DatePickerConfig</td><td><code>See Below</code></td><td>no</td><td>Configuration object - see description below</td></tr></tbody></table>

### Outputs

<table><tbody><tr><td><strong>Output</strong></td><td><strong>Description</strong></td></tr><tr><td>(onShown)</td><td>Fired on datepicker open &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</td></tr><tr><td>(onClose)</td><td>Fired on datepicker close</td></tr></tbody></table>

### Methods

<table><tbody><tr><td><strong>Name</strong></td><td><strong>Description</strong></td></tr><tr><td>show</td><td>Opens the datepicker panel &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td></tr><tr><td>hide</td><td>Closes the datepicker panel</td></tr><tr><td>toggle</td><td>Change from open state to close or close state to open</td></tr></tbody></table>

### Configuration: In order to provide configurations to the date-picker you need to pass it to the `automate-datepicker` component:

```typescript
<automate-datepicker [(ngModel)]="selectedDate" [config]="config"></automate-datepicker>
```

Here are the available configurations:

<table><tbody><tr><td><strong>Name</strong></td><td><strong>Type</strong></td><td><strong>Default</strong></td><td><strong>Applies To</strong></td><td><strong>Description</strong></td></tr><tr><td>format</td><td><code>string</code></td><td><code>'MM/dd/yyyy'</code></td><td>All</td><td>Will be used as the input format style.</td></tr><tr><td>minDate</td><td><code>Date</code></td><td><code>undefined</code></td><td>All</td><td>Disables all dates (on the date-picker) that are set to before the <code>minDate.</code></td></tr><tr><td>maxDate</td><td><code>Date</code></td><td><code>undefined</code></td><td>All</td><td>Disables all dates (on the date-picker) that are set to after the <code>maxDate.</code></td></tr><tr><td>disabledDaysOfWeek</td><td><code>number[]</code></td><td><code>undefined</code></td><td>day</td><td>Disables provided days of week.</td></tr><tr><td>disabledDates</td><td><code>Date[]</code></td><td><code>undefined</code></td><td>day</td><td>Disables provided dates.</td></tr><tr><td>hightLightedDates</td><td><code>{ date:Date, style:Partial&lt;CSSStyleDeclaration&gt; }[]</code></td><td><code>undefined</code></td><td>day</td><td>Hightlight provided dates by specific style.</td></tr><tr><td>daysOfWeek</td><td><code>string[]</code></td><td>&nbsp;</td><td>day</td><td>Days of week names.</td></tr><tr><td>startView</td><td><p><code>EAutomateDatepickerCalendarMode</code>&nbsp;</p><p>(Days = 1, Months = 2, Years = 3)</p></td><td><code>Days</code></td><td>All</td><td>The mode of the calender which will be displayed first.</td></tr><tr><td>closeAfterSelect</td><td><code>boolean</code></td><td><code>true</code></td><td>All</td><td>Indicate, should datepicker be closed after selection.</td></tr><tr><td>showTodayDay</td><td><code>boolean</code></td><td><code>true</code></td><td>day</td><td>Indicate, should datepicker days calendar hightlight today date.</td></tr><tr><td>monthTitle</td><td><code>string</code></td><td><code>'MMMM'</code></td><td>day</td><td>Month format at the datepicker header.</td></tr><tr><td>yearTitle</td><td><code>string</code></td><td><code>'yyyy'</code></td><td>month, year</td><td>Year format at the datepicker header.</td></tr><tr><td>dayLabel</td><td><code>string</code></td><td><code>'d'</code></td><td>day</td><td>Day format at the datepicker calendar.</td></tr><tr><td>monthLabel</td><td><code>string</code></td><td><code>'MMMM'</code></td><td>month</td><td>Month format at the datepicker calendar.</td></tr><tr><td>yearLabel</td><td><code>string</code></td><td><code>'yyyy'</code></td><td>year</td><td>Year format at the datepicker calendar.</td></tr></tbody></table>

### Screenshots

**Default**

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/582ae8756065fe6eae1dca3092b310c4aac06949590dbd70.png)

**Dark**

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/181fefe470fdb651cde948110fd05d2335bce1cca046f906.png)

**Default Christmas**

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/8c493367601ccdce840203bc5fc71a602abfe508e38267b2.png)

**Dark Christmas**

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/d9e5250d2b35646db32d1dcc806d65d3e5c8c05f0ac9b000.png)