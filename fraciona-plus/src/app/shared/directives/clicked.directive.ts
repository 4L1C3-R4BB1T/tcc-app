import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClicked]',
})
export class ClickedDirective {

  @Input()
  effectDisabled = false;

  constructor(
    private readonly elementRef: ElementRef
  ) { }


  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event: MouseEvent | TouchEvent) {
    if (this.effectDisabled) return;
    this.addClickedClass();
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onMouseUp(event: MouseEvent | TouchEvent) {
    if (this.effectDisabled) return;
    this.removeClickedClass();
  }

  private addClickedClass() {
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.classList.add('clicked');
    }
  }

  private removeClickedClass() {
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.classList.remove('clicked');
    }
  }

}
