import { Directive, Inject, ElementRef, AfterViewInit, Input, HostListener, Renderer2, ViewChild,ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ColsMetrics } from '../models/bodyColsMetrics.model';
enum StickyState{
  fixed   = "fixed",
  noFixed = "no-fixed"
}
@Directive({
  selector: '[tableStickyHeader]'
})
export class StickyHeaderDirective implements AfterViewInit{
  private windowWidth:number = 0;
  private fixedState = StickyState.noFixed;
  private scroll:number = 0;
  private headers:any[];
  private childEleCount:number = 0;
  private colElements:HTMLElement;
  private bodyColsMetrics ={all:0};
  private tableWidth:number = 0;
  private hasHeader: boolean = false;
  private header;
  private headerTop:number = 0;
  private callFixed:number = 0;

  @Input('stickyTop') public stickyTop:number = 0;
  @Input('columnWidth') public columnWidth: ColsMetrics;
  @Input('scrollable') public scrollable:boolean;


  constructor(
    private element:ElementRef,
    private renderer:Renderer2,
  ) {}

  ngAfterViewInit():void{

    setTimeout(()=>{
      this.windowWidth = window.innerWidth;

      this.headers   = this.element.nativeElement.getElementsByTagName('TR');
      this.hasHeader = this.headers.length > 0;

      if(this.hasHeader){
        this.header        = this.headers[0];
        this.childEleCount = this.header.childElementCount;

        this.tableWidth    = (this.columnWidth)? this.setWidth(this.columnWidth, this.childEleCount): 0;
        this.headerTop     = Math.round(this.header.getBoundingClientRect().top);
        this.callFixed     = Math.round(this.headerTop - this.stickyTop + window.pageYOffset);
        this.colElements   = this.element.nativeElement.getElementsByTagName('COL');

        if(this.scrollable){
          if(Object.keys(this.colElements).length == 0){
            console.log('initial width:',this.windowWidth);
            console.log('tableWidth: ',this.tableWidth);
            this.makeColumns();
          }else{
            this.setBodyColumns();
            this.setColumnWidth();
          }
        }
      }
    },0);
  }
  private makeColumns(){
    let table = this.element.nativeElement.getElementsByTagName('TABLE');
    for(let i=0; i<table.length; i++){
      var colgroup = this.renderer.createElement('colgroup');
      var col      = this.renderer.createElement('col');

      this.renderer.addClass(colgroup, 'ng-star-inserted');
      this.renderer.addClass(col, 'ng-star-inserted');
      this.renderer.appendChild(colgroup, col);

      this.renderer.appendChild(table[i],colgroup);
    }
    if(Object.keys(this.colElements).length >= 2){
      this.setBodyColumns();
      this.setColumnWidth();
    }
  }
  private setWidth(metrics:object, count:number):number{
    let width:number = 0;
    if(metrics){
      let all:number = metrics['all'];
      let cntMetrics:number = Object.keys(metrics).length;
      width = (cntMetrics>1)?this.calculateWidth(metrics,count):(all * count);
    }
    return width;
  }
  private calculateWidth(metrics:object, count:number):number{
    let width:number = 0;
    if(metrics){
      let all:number = metrics['all'];
      let cntMetrics:number = Object.keys(metrics).length;
      let substractSpaces:number = (cntMetrics - 1) * all;
      width = (all * count) - substractSpaces;
      for(var i in metrics){
        if(i != 'all'){
          width = width+metrics[i];
        }
      }
    }
    return width;
  }
  private setBodyColumns():boolean{

    if(this.colConstructor()){
      let colgroup = this.element.nativeElement.getElementsByTagName('COLGROUP');
      var bodyColumns = (colgroup[0].children.length);
      for(var i in this.columnWidth){
        if(undefined == this.bodyColsMetrics[i]){
          this.bodyColsMetrics[i] = this.columnWidth[i]
        }else{this.bodyColsMetrics[i] = this.columnWidth[i]}
        if(i != 'all'){
          var bodyColumn = bodyColumns+parseInt(i);
          if(undefined == this.bodyColsMetrics[bodyColumn]){
            this.bodyColsMetrics[bodyColumn] = this.columnWidth[i];
          }
        }
      }
      return true;
    }else{
      return false;
    }
  }
  private colConstructor():boolean{
    let colgroup = this.element.nativeElement.getElementsByTagName('COLGROUP');
    let reqCols  = this.header.getElementsByTagName('TH').length;
    let actlCols = colgroup[0].children.length;
    let mzngCols = reqCols - actlCols;

    for(let e = 0; e< mzngCols; e++){
      for(let i=0; i<2; i++){
        var col = this.renderer.createElement('col');
        this.renderer.addClass(col, 'ng-star-inserted');
        this.renderer.appendChild(colgroup[i], col);
      }
    }
    let ret:boolean = (reqCols == colgroup[1].children.length)?true:false;
    return ret;
  }
  private setColumnWidth():void{
    let width = `${this.bodyColsMetrics.all}px`;
    this.setStyleAttribute(this.colElements, {'width': width}, this.bodyColsMetrics);
  }
  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.windowWidth = window.innerWidth;
    console.log('onResize width:',this.windowWidth);
    console.log('tableWidth: ',this.tableWidth);
  }
  @HostListener("window:scroll", ['$event'])
  private handleScroll($event:Event){
    this.scroll = Math.round($event.srcElement.children[0].scrollTop);
    if(this.hasHeader && this.scrollable){
      if(this.scroll >= this.callFixed){
        (this.fixedState == StickyState.noFixed)?this.setSticky():'';
      }else{
        (this.fixedState == StickyState.fixed)?this.unsetSticky():'';
      }
    }
  }
  private setSticky():void{
    this.fixedState = StickyState.fixed;
    let width = `${this.tableWidth+1}px`;
    let stickyTop = `${this.stickyTop}px`;
    let fixedStyles:object = {
      position:'fixed',
      top:stickyTop,
      display:'table',
      'z-index':1,
      'box-shadow':'2px 2px 10px #888888',
      'width':width
    }
    let unfixedStyles:object = {
      position:'static',
      'width':'auto',
      display:'table-row'
    }
    Object.keys(unfixedStyles).forEach((key:string)=>{
      this.header.style.removeProperty(key);
    });
    Object.keys(fixedStyles).forEach((key:string)=>{
      this.header.style.setProperty(key, fixedStyles[key]);
    });

    this.updateColumnsSize();
    this.setClass(true);
  }
  private unsetSticky():void{
    this.fixedState = StickyState.noFixed;
    let width = `${this.tableWidth+1}px`;
    let setStyles:object = {
      position:'static',
      'width':'auto',
      display:'table-row'
    }
    let unsetStyles:object = {
      position:'fixed',
      top:'stickyTop',
      display:'table',
      'z-index':1,
      'box-shadow':'2px 2px 1px #888888',
      'width':width
    }
    Object.keys(unsetStyles).forEach((key:string)=>{
      this.header.style.removeProperty(key);
    });
    Object.keys(setStyles).forEach((key:string)=>{
      this.header.style.setProperty(key, setStyles[key]);
    });
    this.setClass(false);
  }

  private updateColumnsSize():void{
    if(this.fixedState == StickyState.fixed){
      let columnWidth = `${this.columnWidth.all}px`;
      let thArray = this.element.nativeElement.getElementsByTagName('TH');
      this.setStyleAttribute(thArray, {'width': columnWidth}, this.columnWidth);
    }
  }
  private setClass(add:boolean):void{
    (this.fixedState == StickyState.fixed && add)?this.renderer.addClass(this.header, 'isSticky'):this.renderer.removeClass(this.header, 'isSticky');
  }
  private setStyleAttribute(element: HTMLElement, attrs: { [key: string]: Object }, metrics:object): void {
    if (attrs) {
      for(var i in element){
        Object.keys(attrs).forEach((key:string)=>{
          if(undefined != element[i].style){
            if(undefined != metrics[i] && key=='width'){
              let width:string = `${metrics[i]}px`;
              element[i].style.setProperty(key, width);
            }else{
              element[i].style.setProperty(key, attrs[key]);
            }
          }
        });
      }
    }
  }

}
