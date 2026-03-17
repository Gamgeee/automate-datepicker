import { Component, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'automate-datepicker-calendar-container',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './automate-datepicker-calendar-container.component.html',
    styleUrls: ['./automate-datepicker-calendar-container.component.scss']
})
export class AutomateDatePickerCalendarContainerComponent implements AfterViewInit {
    @Input()
    public appendTo!: ElementRef;

    @Input()
    public placement!: 'left' | 'right';

    @Input()
    public container: '' | 'body' = '';

    @Input()
    public theme!: string;

    @ViewChild('container')
    public containerElement!: ElementRef;

    private get _appendToElement(): HTMLElement | null {
        return this.appendTo ? this.appendTo.nativeElement as HTMLElement : null;
    }

    public ngAfterViewInit(): void {
        this._applyPositionStyle();
    }

    private _applyPositionStyle(): void {
        if (this.container === 'body' || !this.containerElement?.nativeElement || !this._appendToElement) {
            return;
        }

        const el = this.containerElement.nativeElement as HTMLElement;
        el.style.left = this._getLeft();
        el.style.top = this._getTop();
    }

    private _getLeft(): string {
        if (!this.containerElement || !this._appendToElement) {
            return '';
        }

        if (this.placement === 'left') {
            return `-${this._appendToElement.offsetWidth}px`;
        }

        if (this.placement === 'right') {
            const containerEl = this.containerElement.nativeElement as HTMLElement;
            return `-${containerEl.offsetWidth}px`;
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
