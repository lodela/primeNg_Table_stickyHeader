import { Component, ViewEncapsulation, OnInit, Directive } from '@angular/core';

import { Clients } from '../../models/clients.model';
import { ClientsService } from '../../services/clients.service';


@Component({
  selector: 'pTable',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './p-table.component.html',
  styleUrls: ['./p-table.component.scss']
})
export class PTableComponent implements OnInit {

  clientsData: Clients[];
  cols:any[];

  first: number = 0;
  selectedClient: Clients[];

  constructor(private clientsService: ClientsService) {}
  ngOnInit() {
    this.getClientService();
  }
  private getClientService(){
    this.clientsService.getClientsData().then(cols => {this.clientsData = cols} );
    this.cols = [
      {field:'name',header:'name'},
      {field:'email',header:'email'},
      {field:'company',header:'company'},
      {field:'personalNumber',header:'personalNumber'},
      {field:'corporateNumber',header:'corporateNumber'},
      {field:'country',header:'country'},
      {field:'city',header:'city'},
      {field:'zipCode',header:'zipCode'},
      {field:'PIN',header:'PIN'},
      {field:'CVV',header:'CVV'},
      {field:'SIREN',header:'SIREN'},
      {field:'trackNo',header:'trackNo'},
      {field:'PAN',header:'PAN'},
      {field:'tree',header:'tree'},
    ]
  }
  reset() {
      this.first = 0;
  }

  exportCSV(param) {
    (param)? console.log(param) : console.log('exporta todos los datos que trae el servicio...');
  }
}
