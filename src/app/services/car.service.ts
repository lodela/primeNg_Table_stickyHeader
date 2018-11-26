import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Car } from '../models/car.model';

@Injectable()
export class CarService {

    constructor(private http: HttpClient) { }

    getCarsSmall() {
    return this.http.get<any>('assets/showcases/data/cars-small.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
    }
}
