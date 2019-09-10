import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public units$ = new BehaviorSubject(0);
  public basket$ = new BehaviorSubject([]);
  constructor() {}
}
