import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {

    constructor(private _elementRef: ElementRef) { }

    @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

    @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (targetElement.classList.contains('menu-mobile')) {
            return this.clickOutside.emit(true);
        }
        if (targetElement.classList.contains('resultSum')) {
            return this.clickOutside.emit(true);
        }
        if (targetElement.classList.contains('sites__delete')) {
            return this.clickOutside.emit(true);
        }
        if (targetElement.classList.contains('user_delete')) {
            return this.clickOutside.emit(true);
        }
        if (clickedInside && targetElement.classList.contains('robot_menu')) {
            this.clickOutside.emit(true);
        } else {
            this.clickOutside.emit(false);
        }
    }

}
