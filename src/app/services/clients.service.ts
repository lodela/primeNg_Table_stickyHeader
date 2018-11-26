import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from '../models/clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http:HttpClient) { }
  getClients(){
    return this.http.get<any>('assets/showcases/data/clients-full.json')
                    .toPromise()
                    .then(res => <Clients[]> res.data)
                    .then(data => { return data; });
  }
  getCols(){
    return this.http.get<any>('assets/showcases/data/clients-full.json')
                    .toPromise()
                    .then(res => <Clients[]> res.cols)
                    .then(data => { return data; });
  }
}
