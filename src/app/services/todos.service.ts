import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todos } from '../models/todos.model';
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http:HttpClient) { }
  getToDos(){
    return this.http.get<any>('https://jsonplaceholder.typicode.com/todos')
                    .toPromise()
                    .then(res => <Todos[]> res)
                    .then(data => { return data; });
  }
}
