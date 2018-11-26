import { Component, ViewEncapsulation, OnInit, Directive, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { Car } from '../../models/car.model';
import { Todos } from '../../models/todos.model';
import { Clients } from '../../models/clients.model';

import { CarService } from '../../services/car.service';
// import { TodosService } from '../../services/todos.service';
import { ClientsService } from '../../services/clients.service';
import { WindowScrollService } from '../../services/window-scroll.service';

import { isPlatformBrowser } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'pTable',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './p-table.component.html',
  styleUrls: ['./p-table.component.scss']
})
export class PTableComponent implements OnInit {
  cars: Car[];
  todos: Todos[];
  clients: Clients[];
  colsClients: Clients[];
  cols:any[];

  first: number = 0;
  selectedClient: Clients[];

  public scrollSubscription:Subscription = null;

  constructor(
    private carService:CarService,
    // private todosService:TodosService,
    private clientsService: ClientsService,
    private windowScrollService: WindowScrollService,

    @Inject(PLATFORM_ID) private platformId: Object,
    private windowScroll:WindowScrollService,
    private element: ElementRef,
    private renderer:Renderer2,
  ) {
    this.initScrollState();
  }
  public initScrollState(){
    if(isPlatformBrowser(this.platformId)){
      this.scrollSubscription = this.windowScroll.scroll$.subscribe(this.handleScroll.bind(this));
    }
  }
  private handleScroll(currentScroll){
    // console.log(currentScroll);
  }
  ngOnInit() {
    this.carService.getCarsSmall().then(cars =>{this.cars = cars});
    // this.todosService.getToDos().then(todos =>{this.todos = todos});
    this.clientsService.getClients().then(clients =>{this.clients = clients});
    this.clientsService.getCols().then(cols => {this.colsClients = cols} );

    this.cols = [
      {field:'color', header:'colores'},
      {field:'vin', header:'VehicleIdentficationNumber'},
      {field:'year', header:'year'},
      {field:'brand', header:'brand'}
    ]
  }
  reset() {
      this.first = 0;
  }

  exportCSV(param) {
    (param)? console.log(param) : console.log('exporta todos los datos que trae el servicio...');
  }
}
