import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {

    constructor(private _elementRef: ElementRef) { }

    @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

    @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (targetElement.classList.contains('resultSum')) {
            this.clickOutside.emit(true);
        } else {
            if (targetElement.classList.contains('sites__delete')) {
                this.clickOutside.emit(true);
            } else {
                if (clickedInside && targetElement.classList.contains('robot_menu')) {
                    this.clickOutside.emit(true);
                } else {
                    this.clickOutside.emit(false);
                }
            }
        }

    }

}
