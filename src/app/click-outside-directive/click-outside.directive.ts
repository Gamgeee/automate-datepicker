import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
})
export class ClickOutsideDirective {
    @Output()
    public clickOutside = new EventEmitter<Event>();

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    public onClick(evt: Event): void {
        const clickedInside = this.elementRef.nativeElement.contains(evt.target);
        if (!clickedInside) {
            this.clickOutside.emit(evt);
        }
    }
}