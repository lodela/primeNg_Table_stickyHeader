import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PTableComponent } from './components/p-table/p-table.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { CarService } from './services/car.service';
import { TodosService } from './services/todos.service';
import { WindowScrollService } from './services/window-scroll.service';

import { StickyBelowViewDirective } from './directives/sticky-below-view.directive';
import { StickyHeaderDirective } from './directives/sticky-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    PTableComponent,
    StickyBelowViewDirective,
    StickyHeaderDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    FormsModule
  ],
  providers: [
    CarService,
    TodosService,
    WindowScrollService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
