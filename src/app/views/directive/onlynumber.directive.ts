import { Directive,HostListener,ElementRef } from '@angular/core';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Directive({
  selector: '[appOnlynumber]'
})
export class OnlynumberDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
