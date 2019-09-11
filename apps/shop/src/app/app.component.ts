import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'ab-shop-root',
  templateUrl: './app.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public title = 'shop';
  public basketUnits = 0;
  public basket = [];
  constructor(
    private basketService: BasketService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.basketService.units$.subscribe({
      next: units => {
        this.basketUnits = units;
        this.cdr.detectChanges();
      }
    });
    this.basketService.basket$.subscribe({
      next: basket => {
        this.basket = basket;
        this.cdr.detectChanges();
      }
    });
  }
  public getNumItems() {
    console.count('get NUM_ITEMS calls');
    return this.basket.length;
  }
}
