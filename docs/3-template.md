title: 3-Template
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Componentes dinámicos, directivas y pipes

---

    # 1. Plantillas de contenido dinámico

    # 2. Atributos custom con Directivas

    # 3. Funciones de transformación con Pipes


---

class: impact

# 1 Plantillas de contenido dinámico

## Un componente común
## Implementaciones distintas

---

```yaml
As a: customer,
  I want: to see a product card with price in euros
  so that: i can decide to purchase it or not

As a: seller,
  I want: to see a product card with stock
  so that: I can ask for more or not
```

---

## 1.1 Un componente común

> La visión del comprador y del vendedor es parecida. Mantenemos estructura, inyectamos contenido.

```html
<mat-card class="dashboard-card">
  <mat-card-header>
    <mat-card-title> {{card.title}} </mat-card-title>
    <mat-card-subtitle> {{card.subtitle}} </mat-card-subtitle>
  </mat-card-header>
  <mat-card-content class="dashboard-card-content">
*   <ng-content select="content"></ng-content>
    <mat-card-actions>
      <ng-content select=".actions"></ng-content>
    </mat-card-actions>
  </mat-card-content>
  <mat-card-footer class="mat-caption">
*   <ng-content select="footer"></ng-content>
  </mat-card-footer>
</mat-card>
```

La directiva `ngContent` permite crear *slots* para incrustar contenido a voluntad del consumidor.
Cada *slot* se identifica mediante un `select="css-selector"`.

---

## 1.2 Implementaciones distintas

```html
<angular-business-product [card]="card"
                          data-cy="product-card">
* <content>
    <div data-cy="product-price">
      Only {{ card.item.price | number:'1.0-0' }} €
    </div>
*   <section class="actions">
      <button (click)="buyProduct(card.item)"
              mat-raised-button
              color="primary">Buy</button>
    </section>
  </content>
* <footer>Stock: {{ card.item.stock }} units</footer>
</angular-business-product>
```

---

```html
 <angular-business-product [card]="card"
                          data-cy="product-card">
* <content>
    <div data-cy="product-stock">
      Remains {{ card.item.stock }} <span>units</span>
    </div>
*   <section class="actions">
      <button (click)="refillProduct(card.item)"
              mat-raised-button
              color="primary">Refill</button>
    </section>
  </content>
* <footer>Price: {{ card.item.price }} Euros</footer>
</angular-business-product>
```

---

> Recap:

# 1 Plantillas de contenido dinámico

## Un componente común
## Implementaciones distintas

---

class: impact

# 2 Atributos custom con Directivas

## Generación de directivas
## Consumo de directivas


---

```yaml
As a: seller,
  I want: to see a green mark on products with stock
  so that: I know I don't do need to refill

As a: seller,
  I want: to see a red mark on products with out stock
  so that: I know I need to refill

```

---

## 2.1 Generación de directivas

```terminal
ng g directive shared/out-of-stock --project=warehouse --export
```

```typescript
@Directive({
  selector: '[angularBusinessOutOfStock]'
})
export class OutOfStockDirective {
  private minimalStock = 10;
  @Input()
  set angularBusinessOutOfStock(stock: number) {
    const color = stock <= this.minimalStock ? 'Red' : 'Green';
    this.el.nativeElement.style.backgroundColor = color;
  }
  constructor(private el: ElementRef) {}
}
```

---

## 2.2 Consumo de directivas

```typescript
@NgModule({
  declarations: [OutOfStockDirective],
  imports: [CommonModule, ViewsModule],
  exports: [ViewsModule, OutOfStockDirective]
})
export class SharedModule {}
```

```html
<div [angularBusinessOutOfStock]="card.item.stock"
  data-cy="product-stock">
  Remains {{ card.item.stock }} <span>units</span>
</div>
```

---

> Recap:

# 2 Atributos custom con Directivas
## Generación de directivas
## Consumo de directivas
---

class: impact

# 3 Funciones de transformación con Pipes

## Generación de pipes
## Consumo de pipes

---

```yaml
As a: customer,
  I want: to see a product price also in dollars
  so that: I can compare prices
As a: customer,
  I want: to see a product price also in pounds
  so that: I can compare prices
```

---

## 3.1 Generación de pipes


```terminal
ng g pipe shared/exRate --project=shop --export
```

```typescript
@Pipe({
  name: 'exRate'
})
export class ExRatePipe implements PipeTransform {
  private euroDollars = 1.13;
  constructor(private httpClient: HttpClient) {}
  public transform(euros: number, symbol: string): number | Observable<number> {
    if (!symbol) {
      return euros * this.euroDollars;
    } else {
      const ratesApi = 'https://api.exchangeratesapi.io/latest?symbols=' + symbol;
      return this.httpClient.get<any>(ratesApi).pipe(map(resp => euros * resp.rates[symbol]));
    }
  }
}
```

---

## 3.2 Consumo de pipes

```typescript
@NgModule({
  declarations: [ExRatePipe],
  imports: [CommonModule, FormsModule, ViewsModule, HttpClientModule],
  exports: [ViewsModule, ExRatePipe]
})
export class SharedModule {}
```

```html
<div class="mat-caption">
  Also ${{ card.item.price | exRate | number:'1.0-0'}} or
  {{ card.item.price | exRate:'GBP' | async | number:'1.0-0'}} £
</div>
```

---

> Recap:

# 3 Funciones de transformación con Pipes

## Generación de pipes
## Consumo de pipes

---


> Next:

# Redux con observables RxJs

## Arquitectura del patrón Redux
## Implementación de un Store con RxJs


> **Blog de apoyo:** [Detección del cambio en Angular](https://academia-binaria.com/deteccion-del-cambio-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
