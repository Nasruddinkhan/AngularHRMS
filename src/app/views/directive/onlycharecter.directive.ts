import { Directive,HostListener,ElementRef } from '@angular/core';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Directive({
  selector: '[appCharisAllow]'
})
export class OnlyCharecterDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
