import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'automate-datepicker-calendar-container',
    templateUrl: './automate-datepicker-calendar-container.component.html',
    styleUrls: ['./automate-datepicker-calendar-container.component.scss']
})
export class AutomateDatePickerCalendarContainerComponent {
    @Input()
    public appendTo: ElementRef;

    @Input()
    public placement: 'left' | 'right';

    @Input()
    public container: '' | 'body' = '';

    @Input()
    public theme: string;

    @ViewChild('container')
    public containerElement: ElementRef;

    public get positionStyle(): CSSStyleDeclaration {
        return this.container === 'body' ? null : this._getAppendToPositions();
    }

    private get _appendToElement(): HTMLElement {
        return this.appendTo ? this.appendTo.nativeElement as HTMLElement : null;
    }

    private _getAppendToPositions(): CSSStyleDeclaration {
        return { left: this._getLeft(), top: this._getTop() } as CSSStyleDeclaration;
    }

    private _getLeft(): string {
        if (!this.containerElement || !this._appendToElement) {
            return '';
        }

        if (this.placement === 'left') {
            return `-${this._appendToElement.offsetWidth}px`;
        }

        if (this.placement === 'right') {
            const containerElement = this.containerElement.nativeElement as HTMLElement;

            return `-${containerElement.offsetWidth}px`;
        }

        throw new Error('Placement not supported.');
    }

    private _getTop(): string {
        if (!this.containerElement || !this._appendToElement) {
            return '';
        }

        return `${this._appendToElement.offsetHeight}px`;
    }
}
