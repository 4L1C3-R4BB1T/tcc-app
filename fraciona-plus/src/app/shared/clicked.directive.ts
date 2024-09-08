import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClicked]',
})
export class ClickedDirective {

  constructor(
    readonly elementRef: ElementRef
  ) { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.elementRef.nativeElement?.classList.add('clicked');
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.elementRef.nativeElement?.classList.remove('clicked');
  }

}
