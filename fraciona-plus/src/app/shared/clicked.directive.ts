import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClicked]',
})
export class ClickedDirective {

  @Input()
  effectDisabled = false;

  constructor(
    readonly elementRef: ElementRef
  ) { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.effectDisabled) return;
    this.elementRef.nativeElement?.classList.add('clicked');
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.effectDisabled) return;
    this.elementRef.nativeElement?.classList.remove('clicked');
  }

}
