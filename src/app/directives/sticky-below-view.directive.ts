import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
enum StickyState{
  fixed   = "fixed",
  noFixed = "no-fixed"
}
@Directive({
  selector: '[appStickyBelowView]'
})
export class StickyBelowViewDirective {
  private fixedState = StickyState.noFixed;
  private initialOffsetFromTop = 0;
  private fixedViewportOffset  = 0;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    this.getInitialOffset();
    this.getFixedViewportOffset();
  }

  private getInitialOffset(){
    let initialViewportOffset = this.element.nativeElement.getBoundingClientRect().top;
    let currentScroll = window.scrollY;
    this.initialOffsetFromTop = initialViewportOffset + currentScroll;
    console.log('Initial: ',this.initialOffsetFromTop);
  }
  private getFixedViewportOffset(){
    // this.renderer.addClass(this.element.nativeElement, 'fixed');
    this.fixedViewportOffset = this.element.nativeElement.getBoundingClientRect().top;
  }

  @HostListener("window:scroll", ['$event'])
  private handleScroll($event:Event){
    let currentScroll = $event.srcElement.children[0].scrollTop;
    let add = currentScroll + this.fixedViewportOffset;
    let top = Math.round(currentScroll);

    let elem = this.element.nativeElement;
    console.log('-----------------------');
    console.log('current', currentScroll)
    console.log('suma: ',add);
    console.log('initial: ', this.initialOffsetFromTop)
    console.log('-----------------------');
    console.log(top);

    if(this.fixedState == StickyState.noFixed && currentScroll > 100){
      this.fixedState = StickyState.fixed;
      this.renderer.addClass(this.element.nativeElement, 'fixed');
    }else if(this.fixedState == StickyState.fixed && currentScroll <= 100){
      let currentOffsetFromTop = currentScroll + this.element.nativeElement.getBoundingClientRect().top;
      // console.log('current scroll after show element: ',currentOffsetFromTop);
      this.fixedState = StickyState.noFixed;
      this.renderer.removeClass(this.element.nativeElement, 'fixed');
    }
  }

}
