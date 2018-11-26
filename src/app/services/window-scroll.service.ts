import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { fromEvent, Observable, empty } from 'rxjs';
import { tap, filter, map, share } from 'rxjs/operators';

const DEBOUNCE_MAX_COUNT = 5;

@Injectable({
  providedIn: 'root'
})
export class WindowScrollService {
  public scroll$:Observable<number>;
  private debounceCounter = 0;
  constructor(
    @Inject(DOCUMENT) private document:any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if(isPlatformBrowser(this.platformId)){
      this.scroll$ = fromEvent(window, 'scroll').pipe(
        tap(event => this.debounceCounter++),
        map(event =>{
          return window.scrollY || this.document.documentElement.scrollTop;
        }),
        filter(scroll => this.debounceCounter >= DEBOUNCE_MAX_COUNT || scroll == 0),
        tap(scroll => this.debounceCounter = 0),
        share());
    }
    else{
      this.scroll$ = empty();
    }
  }
  getCurrentScroll(){
    return window.scrollY || this.document.documentElement.scrollTop;
  }
}
